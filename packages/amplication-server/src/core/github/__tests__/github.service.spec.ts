import { GithubService } from '../github.service';
import { mock } from 'jest-mock-extended';
import { ConfigService } from '@nestjs/config';
import { GoogleSecretsManagerService } from 'src/services/googleSecretsManager.service';
import { GithubTokenExtractor } from '../utils/tokenExtractor/githubTokenExtractor';
import { Module } from '@amplication/data-service-generator';

describe('GithubService', () => {
  describe('testing the results of prepareFilesForPr', () => {
    const configService = mock<ConfigService>();
    const googleSecretManagerService = mock<GoogleSecretsManagerService>();
    const tokenExtractor = mock<GithubTokenExtractor>();
    const githubService = new GithubService(
      configService,
      googleSecretManagerService,
      tokenExtractor
    );
    const placeHolderCode = '';
    const adminUiFiles: string[] = ['admin-ui/src/entity/OrderShow.tsx'];
    const customerCustomFiles: string[] = [
      'server/src/entity/entity.service.ts',
      'server/src/auth/auth.service.ts',
      'server/src/auth/token.service.ts',
      'server/src/auth/password.service.ts',
      'server/src/auth/UserInfo.ts'
      //#region auth strategy
      // { code: '', path: 'server/src/auth/jwt/jwt.strategy.ts' }, //TODO
      // { code: '', path: 'server/src/auth/basic/basic.strategy.ts' }, //TODO
      //#endregion
    ];
    const amplicationFiles: string[] = [
      'server/src/auth/base/auth.service.base.ts',
      ...adminUiFiles // make sure that any admin-ui file is amplication file
    ];

    test.each(amplicationFiles)('%s', path => {
      const module: Module = { code: placeHolderCode, path };
      const expectedResult = JSON.stringify({ [path]: placeHolderCode });
      const result = JSON.stringify(githubService.prepareFilesForPr([module]));

      expect(result).toBe(expectedResult);
    });
    test.each(customerCustomFiles)('%s', path => {
      const module: Module = { code: placeHolderCode, path };
      const result = githubService.prepareFilesForPr([module]);
      const isOverwritesFunction = typeof result[path] === 'function';
      expect(isOverwritesFunction).toBe(true);
    });
  });
});
