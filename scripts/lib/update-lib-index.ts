import fs from 'fs';
import { ESLint } from 'eslint';
import { rules } from './rules';
import { resolvePath } from '@/scripts/lib/resolve-path';

const filePath = resolvePath('@/src/index.ts');
const rawContent = `/* DON'T EDIT THIS FILE. This is generated by 'scripts/lib/update-lib-index.ts' */

export = {
  configs: {
    recommended: require("./configs/recommended"),
  },
  rules: {
    ${rules
      .map((rule) => `"${rule.name}": require("./rules/${rule.name}")`)
      .join(',\n    ')}
  },
};
`;

(async () => {
  const engine = new ESLint({ fix: true });
  const lintResults = await engine.lintText(rawContent, { filePath });
  const content = lintResults[0].output || rawContent;

  fs.writeFileSync(filePath, content);
})();
