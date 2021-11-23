import { Entity, Module } from "../../types";
import { CreateEntityIndexFile } from "./index/CreateEntityIndexFile";
import { CreateDtos } from "./dto/CreateDto";
import { camelCase } from "camel-case";

export class CreateEntity {
  protected readonly createDtos: CreateDtos;
  protected readonly createEntityIndexFile: CreateEntityIndexFile;
  protected readonly entityFolder: string;

  constructor(srcFolder: string, protected readonly entity: Entity) {
    this.entityFolder = `${srcFolder}/${camelCase(entity.displayName)}`;
    this.createEntityIndexFile = new CreateEntityIndexFile(entity);
    this.createDtos = new CreateDtos(this.entityFolder, entity);
  }
  async createFiles(): Promise<Module[]> {
    return Promise.all([
      this.createDtos.createDtosIndex(),
      this.createDtos.createObject(),
      await this.createEntityIndexFile.createFile(
        this.entityFolder,
        this.createDtos.indexPath
      ),
    ]);
  }
}
