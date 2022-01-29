import { UnauthorizedException } from "@nestjs/common";
import { Credentials } from "../Credentials";
import { PasswordService } from "../password.service";
import { TokenService } from "../token.service";
// @ts-ignore
// eslint-disable-next-line
import { UserService } from "../user/user.service";
import { UserInfo } from "../UserInfo";

export class AuthServiceBase {
  constructor(
    protected readonly userService: UserService,
    protected readonly passwordService: PasswordService,
    protected readonly tokenService: TokenService
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
  async login(credentials: Credentials): Promise<UserInfo> {
    const { username, password } = credentials;
    const user = await this.validateUser(
      credentials.username,
      credentials.password
    );
    if (!user) {
      throw new UnauthorizedException("The passed credentials are incorrect");
    }
    //@ts-ignore
    const accessToken = await this.tokenService.createToken(username, password);
    return {
      accessToken,
      ...user,
    };
  }
}
