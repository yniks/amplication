import { pascalCase } from "pascal-case";
import { Entity, Module } from "../../../types";
import { CreateObjectDto } from "./createObject/createObject";

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
    const createObjectDto = new CreateObjectDto(this.entity);
    return createObjectDto.createFile(
      `${this.entityDtoFolderPath}/${pascalCase(this.entity.displayName)}.ts`
    );
  }
}
