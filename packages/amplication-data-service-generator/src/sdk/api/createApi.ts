import { camelCase } from "lodash";
import { AppInfo } from "../../index";
import { Entity, Module } from "../../types";
import { CreateEntityIndexFile } from "./createEntitySdk";

export async function createApi(
  appInfo: AppInfo,
  entities: Entity[],
  entitiesDtosPath: string,
  srcDir: string
): Promise<Module[]> {
  const createEntityIndexFile = new CreateEntityIndexFile();
  return Promise.all(
    entities.map((entity) =>
      createEntityIndexFile.createFile(
        srcDir,
        `${entitiesDtosPath}/${camelCase(entity.displayName)}`,
        entity
      )
    )
  );
}
