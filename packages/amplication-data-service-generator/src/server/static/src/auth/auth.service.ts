import { Injectable } from "@nestjs/common";
// @ts-ignore
// eslint-disable-next-line
import { UserService } from "../user/user.service";
import { AuthServiceBase } from "./base/auth.service.base";
import { PasswordService } from "./password.service";
import { TokenService } from "./token.service";

@Injectable()
export class AuthService extends AuthServiceBase {
  constructor(
    protected readonly userService: UserService,
    protected readonly passwordService: PasswordService,
    protected readonly tokenService: TokenService
  ) {
    super(userService, passwordService, tokenService);
  }
}
