import { builders } from "ast-types";
import { camelCase } from "lodash";
import { pascalCase } from "pascal-case";
import { print } from "recast";
import { Entity, Module } from "../../types";
import {
  addImports,
  importNames,
  interpolate,
  removeTSClassDeclares,
  removeTSInterfaceDeclares,
} from "../../util/ast";
import { readFile, relativeImportPath } from "../../util/module";

export class CreateEntityIndexFile {
  async createFile(
    basePath: string,
    entityDtosPath: string,
    entity: Entity
  ): Promise<Module> {
    const indexFilePath = `${basePath}/${camelCase(
      entity.displayName
    )}/index.ts`;
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
    removeTSInterfaceDeclares(file);

    return { path: indexFilePath, code: print(file).code };
  }
}
