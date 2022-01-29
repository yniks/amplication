import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { PasswordServiceBase } from "./password.service.base";
import * as bcrypt from "bcrypt";

const EXAMPLE_PASSWORD = "examplePassword";
const EXAMPLE_HASHED_PASSWORD = "exampleHashedPassword";

const EXAMPLE_SALT_OR_ROUNDS = 1;

const configServiceGetMock = jest.fn(() => {
  return EXAMPLE_SALT_OR_ROUNDS;
});

jest.mock("bcrypt");

//@ts-ignore
bcrypt.hash.mockImplementation(async () => EXAMPLE_HASHED_PASSWORD);

//@ts-ignore
bcrypt.compare.mockImplementation(async () => true);

describe("PasswordServiceBase", () => {
  let service: PasswordServiceBase;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordServiceBase,
        {
          provide: ConfigService,
          useClass: jest.fn(() => ({
            get: configServiceGetMock,
          })),
        },
      ],
      imports: [],
    }).compile();

    service = module.get<PasswordServiceBase>(PasswordServiceBase);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should have salt defined", () => {
    expect(service.salt).toEqual(EXAMPLE_SALT_OR_ROUNDS);
  });

  it("should compare a password", async () => {
    const args = {
      password: EXAMPLE_PASSWORD,
      hashedPassword: EXAMPLE_HASHED_PASSWORD,
    };
    await expect(
      service.compare(args.password, args.hashedPassword)
    ).resolves.toEqual(true);
  });

  it("should hash a password", async () => {
    await expect(service.hash(EXAMPLE_PASSWORD)).resolves.toEqual(
      EXAMPLE_HASHED_PASSWORD
    );
  });
});
