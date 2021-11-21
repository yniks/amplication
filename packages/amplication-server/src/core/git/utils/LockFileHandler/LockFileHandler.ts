import { Module } from '@amplication/data-service-generator';
import { IFileHandler } from '../../contracts/IFileHandler';

export class LockFileHandler implements IFileHandler {
  handleFile(module: Module, existingCode: string): null {
    return null;
  }
}
