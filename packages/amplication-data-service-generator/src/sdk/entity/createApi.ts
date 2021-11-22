import { Entity, Module } from "../../types";
import { CreateEntity } from "./CreateEntity";

export async function createApi(
  entities: Entity[],
  srcDir: string
): Promise<Module[]> {
  const modulesPromises = entities.map(async (entity) => {
    const createEntity = new CreateEntity(srcDir, entity);
    return await createEntity.createFiles();
  });
  const modules = (await Promise.all(modulesPromises)).flat();
  return modules;
  // return Promise.all(modulesPromises);
}
