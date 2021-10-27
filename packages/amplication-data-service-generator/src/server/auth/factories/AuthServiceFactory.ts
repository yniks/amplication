import { EnumAuthProviderType } from "../../../models";
import { builders as b, namedTypes } from "ast-types";

export class AuthServiceFactory {
  constructor(private readonly enumAuthProviderType: EnumAuthProviderType) {}
  build(): namedTypes.ClassDeclaration {
    return b.classDeclaration(
      b.identifier("AuthService"),
      b.classBody([
        b.methodDefinition(
          "constructor",
          b.identifier("constructor"),
          b.functionExpression(
            null,
            [
              {
                ...b.tsParameterProperty({
                  name: "userService",
                  type: "TSTypeParameter",
                  typeAnnotation: b.tsTypeAnnotation({
                    type: "TSTypeAnnotation",
                    typeAnnotation: b.tsTypeReference(
                      b.identifier("UserService"),
                      undefined
                    ),
                  }),
                }),
                accessibility: "private",
                readonly: true,
              },
            ],
            b.blockStatement([])
          )
        ),
      ]),

      null
    );
  }

  buildLoginMethod(): namedTypes.MethodDefinition {
    return b.methodDefinition("method", b.identifier("login"), {
      ...b.functionExpression(
        null,
        [
          {
            ...b.identifier("credentials"),
            type: "Identifier",
            name: "credentials",
            //   typeAnnotation TODO
          },
        ],
        b.blockStatement([
            b.variableDeclaration("const",)
            
            b.returnStatement(b.objectExpression([]))]),
        false
      ),
      returnType: b.tsTypeAnnotation(
        b.tsTypeReference(
          b.identifier("Promise"),
          b.tsTypeParameterInstantiation([
            b.tsTypeReference(b.identifier("UserInfo")),
          ])
        )
      ),
    });
  }
}
