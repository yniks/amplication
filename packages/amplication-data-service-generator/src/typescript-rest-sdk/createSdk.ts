import { AppInfo } from "../index";
import { Module, Entity } from "../types";
import { createApi } from "./entity/createApi";
import { BASE_DIRECTORY } from "./constants";
import { CreateIndexFile } from "./index/createIndexFile";
import { createPackageJson } from "./npm/createPackageJson";

export async function createSdkModules(
  appInfo: AppInfo,
  entities: Entity[]
): Promise<Module[]> {
  const srcFolder = `${BASE_DIRECTORY}/src`;
  const createIndexFile = new CreateIndexFile();
  const sdks = await createApi(entities, srcFolder);
  return Promise.all([
    createPackageJson(appInfo, BASE_DIRECTORY),
    createIndexFile.createFile(srcFolder),
    ...sdks,
  ]);
}
