import fs from 'fs';
import path from 'path';
import { pluginId } from './lib/plugin-id';
import { resolvePath } from './lib/resolve-path';

(async () => {
  const ruleId = process.argv[2];

  // Require rule ID.
  if (!ruleId) {
    console.error('Usage: npm run add-rule <RULE_ID>');
    process.exitCode = 1;
    return;
  }

  const docPath = path.resolve(
    __dirname,
    resolvePath('@/docs/rules'),
    `${ruleId}.md`
  );

  const rulePath = path.resolve(
    __dirname,
    resolvePath('@/src/rules'),
    `${ruleId}.ts`
  );

  const testPath = path.resolve(
    __dirname,
    resolvePath('@/tests/rules'),
    `${ruleId}.ts`
  );

  // Overwrite check.
  for (const filePath of [docPath, rulePath, testPath]) {
    if (fs.existsSync(filePath)) {
      console.error(
        '%o has existed already.',
        path.relative(process.cwd(), filePath)
      );
      process.exitCode = 1;
      return;
    }
  }

  // Generate files.
  fs.writeFileSync(
    docPath,
    `# ${pluginId}/${ruleId}
> (TODO: summary)

(TODO: why is this rule useful?)

## Rule Details

(TODO: how does this rule check code?)

## Options

(TODO: what do options exist?)
`
  );

  fs.writeFileSync(
    rulePath,
    `import { TSESLint } from "@typescript-eslint/experimental-utils";

const rule: TSESLint.RuleModule<"", []> = {
  meta: {
    docs: {
      // TODO: write the rule summary.
      description: "",
      recommended: false,
      url: "",
    },

    fixable: null,
    messages: {},
    schema: [],

    // TODO: choose the rule type.
    type: "problem",
    type: "suggestion",
    type: "layout",
  },
  create(context) {
    const sourceCode = context.getSourceCode();
    return {};
  },
};

export = rule;
`
  );

  fs.writeFileSync(
    testPath,
    `
import { TSESLint } from "@typescript-eslint/utils";
import rule from "@/src/rules/${ruleId}";

new TSESLint.RuleTester().run("${ruleId}", rule, {
  valid: [],
  invalid: [],
});
`
  );
})();
