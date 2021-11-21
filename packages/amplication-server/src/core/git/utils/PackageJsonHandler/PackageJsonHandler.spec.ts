import { PackageJsonHandler } from './PackageJsonHandler';
import {
  modifiedPackageJson,
  modifiedScripts,
  unModifiedPackageJson
} from './__mocks__/packageJson';

describe('PackageJsonHandler', () => {
  const packageJsonHandler = new PackageJsonHandler();
  describe('PackageJsonHandler.handleFile()', () => {
    it('should dont overwrite the scripts in existing file', () => {
      const effectedPackageJson = packageJsonHandler.handleFile(
        {
          path: 'server/package.json',
          code: unModifiedPackageJson
        },
        modifiedPackageJson
      );
      expect(effectedPackageJson).toBe(
        JSON.stringify(JSON.parse(modifiedPackageJson))
      );
      expect(JSON.parse(effectedPackageJson).scripts === modifiedScripts);
    });
  });
});
