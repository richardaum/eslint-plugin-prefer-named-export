import { TSESLint } from '@typescript-eslint/experimental-utils';
import rule from '@/src/rules/prefer-named-export';

new TSESLint.RuleTester().run('prefer-named-export', rule, {
  valid: [],
  invalid: [],
});
