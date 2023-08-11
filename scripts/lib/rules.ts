import fs from 'fs';
import path from 'path';
import { pluginId } from './plugin-id';
import { resolvePath } from './resolve-path';

const rootDir = resolvePath('@/src/rules/');

export type RuleInfo = {
  filePath: string;
  id: string;
  name: string;
  type: string;
  description: string;
  recommended: boolean;
  deprecated: boolean;
  fixable: boolean;
  replacedBy: string[];
};

export type CategoryInfo = {
  id: string;
  rules: RuleInfo[];
};

export const rules: RuleInfo[] = fs
  .readdirSync(rootDir)
  .sort()
  .map((filename): RuleInfo => {
    const filePath = path.join(rootDir, filename);
    const name = filename.slice(0, -3);
    const { meta } = require(filePath);

    return {
      filePath,
      id: `${pluginId}/${name}`,
      name,
      deprecated: Boolean(meta.deprecated),
      fixable: Boolean(meta.fixable),
      replacedBy: [],
      type: meta.type,
      ...meta.docs,
    };
  });

console.log({ rules });

export const categories: CategoryInfo[] = Object.entries({
  problem: 'Possible Errors',
  suggestion: 'Best Practices',
  layout: 'Stylistic Issues',
}).map(
  ([type, category]): CategoryInfo => ({
    id: category,
    rules: rules.filter((rule) => rule.type === type && !rule.deprecated),
  })
);
