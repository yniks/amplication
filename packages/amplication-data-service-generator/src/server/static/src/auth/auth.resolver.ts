import { Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthResolverBase } from "./base/auth.resolver.base";
import { UserInfo } from "./UserInfo";

@Resolver(UserInfo)
export class AuthResolver extends AuthResolverBase {
  constructor(protected readonly authService: AuthService) {
    super(authService);
  }
}
