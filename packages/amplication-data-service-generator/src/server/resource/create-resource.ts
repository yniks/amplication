import { camelCase } from "camel-case";
import flatten from "lodash.flatten";
import { paramCase } from "param-case";
import { plural } from "pluralize";
import * as winston from "winston";
import { AppInfo, Entity, Module } from "../../types";
import { validateEntityName } from "../../util/entity";
import { createControllerModules } from "./controller/create-controller";
import { DTOs } from "./create-dtos";
import { createModules } from "./module/create-module";
import { createResolverModules } from "./resolver/create-resolver";
import { createServiceModules } from "./service/create-service";
import { createSpecs } from "./test/createSpecs";

export async function createResourcesModules(
  appInfo: AppInfo,
  entities: Entity[],
  dtos: DTOs,
  logger: winston.Logger
): Promise<Module[]> {
  const resourceModuleLists = await Promise.all(
    entities.map((entity) =>
      createResourceModules(appInfo, entity, dtos, logger)
    )
  );
  const resourcesModules = flatten(resourceModuleLists);
  return resourcesModules;
}

async function createResourceModules(
  appInfo: AppInfo,
  entity: Entity,
  dtos: DTOs,
  logger: winston.Logger
): Promise<Module[]> {
  const entityType = entity.name;

  validateEntityName(entity);

  logger.info(`Creating ${entityType}...`);
  const entityName = camelCase(entityType);
  const resource = paramCase(plural(entityName));

  const serviceModules = await createServiceModules(
    entityName,
    entityType,
    entity,
    dtos
  );

  const [serviceModule] = serviceModules;

  const controllerModules = await createControllerModules(
    appInfo,
    resource,
    entityName,
    entityType,
    serviceModule.path,
    entity,
    dtos
  );

  const [controllerModule, controllerBaseModule] = controllerModules;

  const resolverModules = await createResolverModules(
    entityName,
    entityType,
    serviceModule.path,
    entity,
    dtos
  );
  const [resolverModule] = resolverModules;

  const resourceModules = await createModules(
    entityName,
    entityType,
    serviceModule.path,
    controllerModule.path,
    resolverModule.path
  );
  const specs = await createSpecs(
    resource,
    entity,
    entityType,
    serviceModule.path,
    controllerModule.path,
    controllerBaseModule.path
  );

  return [
    ...serviceModules,
    ...controllerModules,
    ...resolverModules,
    ...resourceModules,
    ...specs,
  ];
}
