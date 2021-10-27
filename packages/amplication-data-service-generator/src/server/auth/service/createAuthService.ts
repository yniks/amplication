import { print } from "recast";
import { AppInfo, Module } from "../../../types";
import {
  interpolate,
  removeTSClassDeclares,
  removeTSIgnoreComments,
} from "../../../util/ast";
import { readFile } from "../../../util/module";
import { AuthServiceFactory } from "../factories/AuthServiceFactory";

export async function createAuthService(
  authDir: string,
  appInfo: AppInfo
): Promise<Module> {
  const file = await readFile(require.resolve("./auth.service.template.ts"));
  const filePath = `${authDir}/auth.service.ts`;
  const { settings } = appInfo;
  const { authProvider } = settings;
  const authServiceFactory = new AuthServiceFactory(authProvider);
  interpolate(file, {
    LOGIN_FUNCTION: authServiceFactory.buildLoginMethod(),
  });
  removeTSIgnoreComments(file);
  removeTSClassDeclares(file);
  return { code: print(file).code, path: filePath };
}
