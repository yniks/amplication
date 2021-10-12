import { Entity, Module } from "../../../types";
import { createControllerSpecModule } from "./create-controller-spec";

export async function createSpecs(
  resource: string,
  entity: Entity,
  entityType: string,
  entityServiceModule: string,
  entityControllerModule: string,
  entityControllerBaseModule: string
): Promise<Module[]> {
  const controllerSpec = await createControllerSpecModule(
    resource,
    entity,
    entityType,
    entityServiceModule,
    entityControllerModule,
    entityControllerBaseModule
  );
  return [controllerSpec];
}
