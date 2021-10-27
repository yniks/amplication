import { Injectable, UnauthorizedException } from "@nestjs/common";
// @ts-ignore
import { PasswordService } from "./password.service";
// @ts-ignore
import { UserService } from "../user/user.service";
// @ts-ignore
import { UserInfo } from "./UserInfo";
// @ts-ignore
import { Credentials } from "./Credentials";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<UserInfo | null> {
    const user = await this.userService.findOne({
      where: { username },
    });
    if (user && (await this.passwordService.compare(password, user.password))) {
      const { roles } = user;
      return { username, roles };
    }
    return null;
  }
  //@ts-ignore
  LOGIN_FUNCTION;
}
