import { AppInfo } from "../../index";
import { Module, Entity } from "../../types";
import { createApiModels } from "./createApiModels";

export function createModelsModules(
  baseDirectory: string,
  appInfo: AppInfo,
  entities: Entity[]
): Module[] {
  const MODELS_BASE_DIR = `${baseDirectory}/models`;
  return [...createApiModels(MODELS_BASE_DIR, appInfo, entities)];
}
