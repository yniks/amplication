import { IFileHandler } from '../../contracts/IFileHandler';
import { LockFileHandler } from '../LockFileHandler/LockFileHandler';
import { PackageJsonHandler } from '../PackageJsonHandler/PackageJsonHandler';
import { UnknownFileHandler } from '../UnknownFileHandler/UnknownFileHandler';

export class HandlerFactory {
  //do not override files in 'server/src/[entity]/[entity].[controller/resolver/service/module].ts'
  //do not override server/scripts/customSeed.ts
  private doNotOverride = [
    /^server\/src\/[^\/]+\/.+\.controller.ts$/,
    /^server\/src\/[^\/]+\/.+\.resolver.ts$/,
    /^server\/src\/[^\/]+\/.+\.service.ts$/,
    /^server\/src\/[^\/]+\/.+\.module.ts$/,
    /^server\/scripts\/customSeed.ts$/
  ];
  getHandler(path: string): IFileHandler {
    const filename = path.replace(/^.*[\\\/]/, '');

    const fileExtension = filename
      .split('.')
      .pop()
      .toLowerCase();

    if (this.doNotOverride.some(rx => rx.test(path))) {
      return new LockFileHandler();
    }
    switch (fileExtension) {
      case 'json':
        if (filename === 'package.json') {
          return new PackageJsonHandler();
        }
        return new UnknownFileHandler();
      default:
        return new UnknownFileHandler();
    }
  }
}
