import { EnumAuthProviderType } from "../../../models";
import { builders as b, namedTypes } from "ast-types";

export class AuthServiceFactory {
  constructor(private readonly enumAuthProviderType: EnumAuthProviderType) {}
  build(): namedTypes.ClassDeclaration {
    return b.classDeclaration(
      b.identifier("AuthService"),
      b.classBody([this.buildConstructor(), this.buildLoginMethod()]),
      null
    );
  }
  private buildConstructor() {
    return b.methodDefinition(
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
    );
  }

  public buildLoginMethod(): namedTypes.MethodDefinition {
    return b.methodDefinition("method", b.identifier("login"), {
      ...b.functionExpression(
        null,
        [
          {
            ...b.identifier("credentials"),
            type: "Identifier",
            name: "credentials",
            typeAnnotation: b.tsTypeAnnotation(
              b.tsTypeReference(b.identifier("Credentials"))
            ),
          },
        ],
        b.blockStatement([
          b.variableDeclaration("const", [
            b.variableDeclarator(
              b.identifier("user"),
              b.awaitExpression(
                b.callExpression(
                  b.memberExpression(
                    b.thisExpression(),
                    b.identifier("validateUser")
                  ),
                  [
                    b.memberExpression(
                      b.identifier("credentials"),
                      b.identifier("username")
                    ),
                    b.memberExpression(
                      b.identifier("credentials"),
                      b.identifier("password")
                    ),
                  ]
                )
              )
            ),
          ]),
          b.ifStatement(
            b.unaryExpression("!", b.identifier("user")),
            b.blockStatement([
              b.throwStatement(
                b.newExpression(b.identifier("UnauthorizedException"), [
                  b.literal("The passed credentials are incorrect"),
                ])
              ),
            ])
          ),

          b.variableDeclaration("const", [
            b.variableDeclarator(
              b.identifier("accessToken"),
              b.awaitExpression(
                b.callExpression(
                  b.memberExpression(
                    b.memberExpression(
                      b.thisExpression(),
                      b.identifier("jwtService")
                    ),
                    b.identifier("signAsync")
                  ),
                  [
                    b.objectExpression([
                      b.property(
                        "init",
                        b.identifier("username"),
                        b.memberExpression(
                          b.identifier("user"),
                          b.identifier("username")
                        )
                      ),
                    ]),
                  ]
                )
              )
            ),
          ]),
          b.returnStatement(
            b.objectExpression([
              b.property(
                "init",
                b.identifier("accessToken"),
                b.identifier("accessToken")
              ),
              b.spreadElement(b.identifier("user")),
            ])
          ),
        ]),
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
      async: true,
    });
  }
}
