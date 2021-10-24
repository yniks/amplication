import { Entity, Module } from "../../types";
import { builders, namedTypes } from "ast-types";
import { print } from "recast";
import { camelCase } from "lodash";

function createConstructorParams(
  entity: Entity
): namedTypes.TSParameterProperty[] {
  return entity.fields.map((field) => {
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

export function createEntityModel(
  baseDirectory: string,
  entity: Entity
): Module {
  const constructor = builders.methodDefinition(
    "constructor",
    builders.identifier("constructor"),
    builders.functionExpression(
      null,
      createConstructorParams(entity),
      builders.blockStatement([])
    )
  );
  const classDeclaration = builders.classDeclaration(
    builders.identifier(entity.name),
    builders.classBody([constructor])
  );
  const file = builders.file(
    builders.program([builders.exportNamedDeclaration(classDeclaration)])
  );
  return {
    path: `${baseDirectory}/${camelCase(entity.displayName)}/${
      entity.displayName
    }.ts`,
    code: print(file).code,
  };
}
