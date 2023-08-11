import { pathsToModuleNameMapper } from 'ts-jest';
import { loadTsConfig } from './scripts/lib/load-tsconfig';
import type { Config } from 'jest';

const tsConfig = loadTsConfig();

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleNameMapper: pathsToModuleNameMapper(tsConfig.paths, {
    prefix: tsConfig.absoluteBaseUrl,
  }),
};

export default config;
