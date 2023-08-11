import { resolvePath } from '@/scripts/lib/resolve-path';
import fs from 'fs';

export const getCode = (path: string) => {
  return fs.readFileSync(resolvePath(path), 'utf8');
};
