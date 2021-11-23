import { AppInfo } from "../../index";
import { Module, Entity } from "../../types";
import { createEntityModel } from "./createEntityModel";

export function createApiModels(
  baseDirectory: string,
  appInfo: AppInfo,
  entities: Entity[]
): Module[] {
  const apiModelsBaseDir = `${baseDirectory}/api`;
  const entitiesModules = entities.map((entity) => {
    return createEntityModel(apiModelsBaseDir, entity);
  });
  return [...entitiesModules];
}
