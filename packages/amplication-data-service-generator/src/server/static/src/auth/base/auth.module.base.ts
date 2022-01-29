import { forwardRef, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JWT_EXPIRATION, JWT_SECRET_KEY } from "../../constants";
import { SecretsManagerModule } from "../../providers/secrets/secretsManager.module";
import { SecretsManagerService } from "../../providers/secrets/secretsManager.service";
// @ts-ignore
// eslint-disable-next-line
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    SecretsManagerModule,
    JwtModule.registerAsync({
      imports: [SecretsManagerModule],
      inject: [SecretsManagerService, ConfigService],
      useFactory: async (
        secretsService: SecretsManagerService,
        configService: ConfigService
      ) => {
        const secret = await secretsService.getSecret<string>(JWT_SECRET_KEY);
        const expiresIn = configService.get(JWT_EXPIRATION);
        if (!secret) {
          throw new Error("Didn't get a valid jwt secret");
        }
        if (!expiresIn) {
          throw new Error("Jwt expire in value is not valid");
        }
        return {
          secret: secret,
          signOptions: { expiresIn },
        };
      },
    }),
  ],
  exports: [UserModule, PassportModule, SecretsManagerModule, JwtModule],
})
export class AuthModuleBase {}
