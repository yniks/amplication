import { camelCase } from "lodash";
import { readFile, relativeImportPath } from "../../util/module";
import { Entity, Module } from "../../types";
import { print } from "recast";
import {
  addImports,
  importNames,
  interpolate,
  removeTSClassDeclares,
} from "../../util/ast";
import { builders } from "ast-types";
import { pascalCase } from "pascal-case";

export async function createEntitySdk(
  apiDir: string,
  entityDtosPath: string,
  entity: Entity
): Promise<Module> {
  const indexFilePath = `${apiDir}/${camelCase(entity.displayName)}/index.ts`;
  const templatePath = require.resolve("./index.template.ts");
  const file = await readFile(templatePath);

  interpolate(file, {
    ENTITY_NAME_SDK_SUFFIX: builders.identifier(
      `${pascalCase(entity.displayName)}SDK`
    ),
    ENTITY_ENDPOINT: builders.stringLiteral(
      `/${entity.displayName.toLowerCase()}`
    ),
    ENTITY: builders.identifier(pascalCase(entity.displayName)),
  });
  const importsList = [
    importNames(
      [builders.identifier(pascalCase(entity.displayName))],
      relativeImportPath(
        indexFilePath,
        `${entityDtosPath}/${pascalCase(entity.displayName)}.ts`
      )
    ),
  ];

  addImports(file, importsList);
  removeTSClassDeclares(file);
  return { path: indexFilePath, code: print(file).code };
}
