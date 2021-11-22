import { pascalCase } from "pascal-case";
import { Entity, Module } from "../../../types";

export class CreateDtos {
  private readonly entityDtoFolderPath: string;
  public readonly indexPath: string;
  constructor(entityFolderPath: string, private readonly entity: Entity) {
    this.entityDtoFolderPath = `${entityFolderPath}/dto`;
    this.indexPath = `${this.entityDtoFolderPath}/index.ts`;
  }
  createDtosIndex(): Module {
    return { code: "", path: this.indexPath };
  }
  createObject(): Module {
    return {
      code: "",
      path: `${this.entityDtoFolderPath}/${pascalCase(
        this.entity.displayName
      )}.ts`,
    };
  }
}
