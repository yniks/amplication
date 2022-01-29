import { Injectable } from "@nestjs/common";
import { PasswordServiceBase } from "./base/password.service.base";

@Injectable()
export class PasswordService extends PasswordServiceBase {}
