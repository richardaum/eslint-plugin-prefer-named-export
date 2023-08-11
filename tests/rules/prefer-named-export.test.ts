import { TSESLint } from '@typescript-eslint/experimental-utils';
import rule from '@/src/rules/prefer-named-export';
import { getCode } from '@/tests/utils/get-code';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

describe('eslint-plugin-prefer-named-export', () => {
  ruleTester.run('prefer-named-export', rule, {
    valid: [getCode('@/tests/rules/fixtures/correct.1.tsx')],
    invalid: [
      {
        code: getCode('@/tests/rules/fixtures/wrong.input.ts'),
        output: getCode('@/tests/rules/fixtures/wrong.output.ts'),
        errors: [{ messageId: 'preferNamedExport' }],
      },
    ],
  });
});
