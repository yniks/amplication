import { Test, TestingModule } from "@nestjs/testing";
// @ts-ignore
// eslint-disable-next-line
import { User } from "src/user/base/User";
// @ts-ignore
// eslint-disable-next-line
import { UserService } from "../../user/user.service";
import { AuthServiceBase } from "./auth.service.base";
import { Credentials } from "../Credentials";
import { PasswordService } from "../password.service";
import { TokenService } from "../token.service";

const VALID_CREDENTIALS: Credentials = {
  username: "Valid User",
  password: "Valid User Password",
};
const INVALID_CREDENTIALS: Credentials = {
  username: "Invalid User",
  password: "Invalid User Password",
};
const USER: any = {
  ...VALID_CREDENTIALS,
  createdAt: new Date(),
  firstName: "ofek",
  id: "1",
  lastName: "gabay",
  roles: ["admin"],
  updatedAt: new Date(),
};

const SIGN_TOKEN = "SIGN_TOKEN";

const userService = {
  findOne(args: { where: { username: string } }): any | null {
    if (args.where.username === VALID_CREDENTIALS.username) {
      return USER;
    }
    return null;
  },
};

const passwordService = {
  compare(password: string, encrypted: string) {
    return true;
  },
};

const tokenService = {
  createToken(username: string, password: string) {
    return SIGN_TOKEN;
  },
};

describe("AuthServiceBase", () => {
  //ARRANGE
  let service: AuthServiceBase;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
        {
          provide: PasswordService,
          useValue: passwordService,
        },
        {
          provide: TokenService,
          useValue: tokenService,
        },
        AuthServiceBase,
      ],
    }).compile();

    service = module.get<AuthServiceBase>(AuthServiceBase);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("Testing the authService.validateUser()", () => {
    it("should validate a valid user", async () => {
      await expect(
        service.validateUser(
          VALID_CREDENTIALS.username,
          VALID_CREDENTIALS.password
        )
      ).resolves.toEqual({
        username: USER.username,
        roles: USER.roles,
      });
    });

    it("should not validate a invalid user", async () => {
      await expect(
        service.validateUser(
          INVALID_CREDENTIALS.username,
          INVALID_CREDENTIALS.password
        )
      ).resolves.toBe(null);
    });
  });

  describe("Testing the authService.login()", () => {
    it("should return userInfo object for correct username and password", async () => {
      const loginResult = await service.login(VALID_CREDENTIALS);
      expect(loginResult).toEqual({
        username: USER.username,
        roles: USER.roles,
        accessToken: SIGN_TOKEN,
      });
    });
  });
});
