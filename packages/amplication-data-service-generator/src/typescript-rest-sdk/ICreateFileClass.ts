import { Module } from "../types";

export interface ICreateFileClass {
  createFile: (basePath: string) => Module | Promise<Module>;
}
