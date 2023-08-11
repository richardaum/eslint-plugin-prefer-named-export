import { pathsToModuleNameMapper } from 'ts-jest';
import { loadTsConfig } from '@/scripts/lib/load-tsconfig';

const tsConfig = loadTsConfig();

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.ts'],
  moduleNameMapper: pathsToModuleNameMapper(tsConfig.paths, {
    prefix: tsConfig.absoluteBaseUrl,
  }),
};
