import { createMatchPath, loadConfig } from 'tsconfig-paths';

export function resolvePath(aliasedPath: string): string {
  const tsConfig = loadConfig();

  if (tsConfig.resultType !== 'success')
    throw new Error('Failed to load config');

  const matchPath = createMatchPath(tsConfig.absoluteBaseUrl, tsConfig.paths);
  return matchPath(aliasedPath, undefined, () => true) as string;
}
