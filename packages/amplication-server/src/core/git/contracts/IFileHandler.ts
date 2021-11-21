import { Module } from '@amplication/data-service-generator';

export interface IFileHandler {
  handleFile: (module: Module, existingCode: string | null) => string | null;
}
