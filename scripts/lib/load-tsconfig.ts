import { loadConfig } from 'tsconfig-paths';

export const loadTsConfig = () => {
  const tsConfig = loadConfig();
  if (tsConfig.resultType !== 'success')
    throw new Error('Failed to load config');
  return tsConfig;
};
