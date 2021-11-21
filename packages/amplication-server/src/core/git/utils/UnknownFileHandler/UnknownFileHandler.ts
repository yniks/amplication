import { Module } from '@amplication/data-service-generator';
import { IFileHandler } from '../../contracts/IFileHandler';

export class UnknownFileHandler implements IFileHandler {
  handleFile(module: Module, existingCode: string | null): string {
    return module.code;
  }
}
