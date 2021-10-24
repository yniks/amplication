import { camelCase } from "lodash";
import { AppInfo } from "../../index";
import { Module, Entity } from "../../types";
import { createEntitySdk } from "./createEntitySdk";

export async function createApi(
  appInfo: AppInfo,
  entities: Entity[],
  entitiesDtosPath: string,
  srcDir: string
): Promise<Module[]> {
  const apiDir = `${srcDir}/api`;
  return Promise.all(
    entities.map((entity) =>
      createEntitySdk(
        apiDir,
        `${entitiesDtosPath}/${camelCase(entity.displayName)}`,
        entity
      )
    )
  );
}
