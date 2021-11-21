import { Module } from '@amplication/data-service-generator';
import { merge } from 'lodash';
import { IFileHandler } from '../../contracts/IFileHandler';
import { format } from 'prettier';

export class PackageJsonHandler implements IFileHandler {
  handleFile(module: Module, existingCode: string | null): string {
    const moduleObject = JSON.parse(module.code);
    const obj = JSON.parse(existingCode);
    const mergedObject = merge(moduleObject, obj);
    return format(JSON.stringify(mergedObject), { parser: 'json' });
  }
}
