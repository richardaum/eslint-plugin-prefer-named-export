import { createMatchPath } from 'tsconfig-paths';
import { loadTsConfig } from './load-tsconfig';

export function resolvePath(aliasedPath: string): string {
  const tsConfig = loadTsConfig();
  const matchPath = createMatchPath(tsConfig.absoluteBaseUrl, tsConfig.paths);
  return matchPath(aliasedPath, undefined, () => true) as string;
}
