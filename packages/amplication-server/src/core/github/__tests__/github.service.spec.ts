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
    const adminUiFiles: Module[] = [
      { code: '', path: 'admin-ui/src/entity/OrderShow.tsx' }
    ];
    const customerCustomFiles: Module[] = [
      { code: '', path: 'server/src/entity/entity.service.ts' },
      { code: '', path: 'server/src/auth/auth.service.ts' },
      { code: '', path: 'server/src/auth/token.service.ts' },
      { code: '', path: 'server/src/auth/password.service.ts' },
      { code: '', path: 'server/src/auth/UserInfo.ts' }
      //#region auth strategy
      // { code: '', path: 'server/src/auth/jwt/jwt.strategy.ts' }, //TODO
      // { code: '', path: 'server/src/auth/basic/basic.strategy.ts' }, //TODO
      //#endregion
    ];
    const amplicationFiles: Module[] = [
      { code: '', path: 'server/src/auth/base/auth.service.base.ts' },
      ...adminUiFiles // make sure that any admin-ui file is amplication file
    ];

    test.each(amplicationFiles)('%s', module => {
      const expectedResult = JSON.stringify({ [module.path]: module.code });
      const result = JSON.stringify(githubService.prepareFilesForPr([module]));

      expect(result).toBe(expectedResult);
    });
    test.each(customerCustomFiles)('%s', module => {
      const result = githubService.prepareFilesForPr([module]);
      const isOverwritesFunction = typeof result[module.path] === 'function';
      expect(isOverwritesFunction).toBe(true);
    });
  });
});
