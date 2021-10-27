import { AppInfo, Module } from "../../types";
import { createAuthService } from "./service/createAuthService";
import { createDefaultGuard } from "./guards/createDefaultGuard";

export async function createAuthModules(
  srcDir: string,
  appInfo: AppInfo
): Promise<Module[]> {
  const authDir = `${srcDir}/auth`;
  const { settings } = appInfo;
  const { authProvider } = settings;
  const defaultGuardFile = createDefaultGuard(authProvider);
  const authService = createAuthService(authDir, appInfo);
  return Promise.all([defaultGuardFile, authService]);
}
