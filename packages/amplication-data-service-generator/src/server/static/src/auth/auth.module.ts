import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { AuthModuleBase } from "./base/auth.module.base";
import { BasicStrategy } from "./basic/basic.strategy";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { jwtSecretFactory } from "./jwt/jwtSecretFactory";
import { PasswordService } from "./password.service";
//@ts-ignore
import { TokenService } from "./token.service";

@Module({
  imports: [AuthModuleBase],
  providers: [
    AuthService,
    BasicStrategy,
    PasswordService,
    AuthResolver,
    JwtStrategy,
    jwtSecretFactory,
    TokenService,
  ],
  controllers: [AuthController],
  exports: [AuthService, PasswordService],
})
export class AuthModule {}
