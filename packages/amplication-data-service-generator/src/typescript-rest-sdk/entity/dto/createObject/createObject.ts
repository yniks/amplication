import { ICreateFileClass } from "../../../../typescript-rest-sdk/ICreateFileClass";
import { Entity, Module } from "../../../../types";
import { builders, namedTypes } from "ast-types";
import { print } from "recast";

export class CreateObjectDto implements ICreateFileClass {
  constructor(protected readonly entity: Entity) {}
  createFile(path: string): Module {
    const constructor = builders.methodDefinition(
      "constructor",
      builders.identifier("constructor"),
      builders.functionExpression(
        null,
        this.createConstractor(),
        builders.blockStatement([])
      )
    );
    const classDeclaration = builders.classDeclaration(
      builders.identifier(this.entity.name),
      builders.classBody([constructor])
    );
    const file = builders.file(
      builders.program([builders.exportNamedDeclaration(classDeclaration)])
    );
    return { code: print(file).code, path };
  }
  createConstractor(): namedTypes.TSParameterProperty[] {
    return this.entity.fields.map((field) => {
      return {
        ...builders.tsParameterProperty({
          name: field.name,
          typeAnnotation: {
            ...builders.tsTypeAnnotation(builders.tsStringKeyword()),
            type: "TSTypeAnnotation",
            typeAnnotation: builders.tsStringKeyword(),
          },
          type: "TSTypeParameter",
        }),
        accessibility: "public",
      };
    });
  }
}
