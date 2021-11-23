import { builders } from "ast-types";
import { pascalCase } from "pascal-case";
import { print } from "recast";
import { Entity, Module } from "../../../types";
import {
  addImports,
  importNames,
  interpolate,
  removeTSClassDeclares,
  removeTSInterfaceDeclares,
} from "../../../util/ast";
import { readFile, relativeImportPath } from "../../../util/module";

export class CreateEntityIndexFile {
  constructor(protected readonly entity: Entity) {}
  async createFile(
    entityFolderPath: string,
    entityIndexDtosPath: string
  ): Promise<Module> {
    const indexFilePath = `${entityFolderPath}/index.ts`;
    const templatePath = require.resolve("./index.template.ts");
    const file = await readFile(templatePath);

    interpolate(file, {
      ENTITY_NAME_SDK_SUFFIX: builders.identifier(
        `${pascalCase(this.entity.displayName)}SDK`
      ),
      ENTITY_ENDPOINT: builders.stringLiteral(
        `/${this.entity.displayName.toLowerCase()}`
      ),
      ENTITY: builders.identifier(pascalCase(this.entity.displayName)),
    });
    const importsList = [
      importNames(
        [builders.identifier(pascalCase(this.entity.displayName))],
        relativeImportPath(
          indexFilePath,
          `${entityIndexDtosPath}/${pascalCase(this.entity.displayName)}.ts`
        )
      ),
    ];

    addImports(file, importsList);
    removeTSClassDeclares(file);
    removeTSInterfaceDeclares(file);

    return { path: indexFilePath, code: print(file).code };
  }
}
