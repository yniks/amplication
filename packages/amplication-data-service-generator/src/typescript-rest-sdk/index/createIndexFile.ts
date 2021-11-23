import { Module } from "../../types";
import { ICreateFileClass } from "../ICreateFileClass";

export class CreateIndexFile implements ICreateFileClass {
  createFile(basePath: string): Module {
    return { code: "", path: `${basePath}/index.ts` };
  }
}
