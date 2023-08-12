import { TSESLint } from '@typescript-eslint/experimental-utils';

const rule: TSESLint.RuleModule<'preferNamedExport', []> = {
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description: [
        'This rule enforces the use of named exports instead of default exports.',
        'It checks for export statements that use the export default syntax with an identifier as the default export,',
        'and suggests exporting the variable directly with a named export instead.',
      ].join(' '),
      recommended: 'error',
    },
    messages: {
      preferNamedExport: 'Export the variable {{variableName}} directly.',
    },
    hasSuggestions: true,
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      ExportDefaultDeclaration(node) {
        if (node.declaration.type === 'Identifier') {
          const variableName = node.declaration.name;
          const { variables } = context.getScope();
          const variable = variables.find((v) => v.name === variableName);
          const variableNode = variable?.defs[0].node.parent;

          if (variableNode?.type === 'VariableDeclaration') {
            const sourceCode = context.getSourceCode();
            const parentNode = variableNode?.parent;
            const parentNodeSourceCode = sourceCode.getText(parentNode);
            const isAlreadyBeignExported =
              parentNodeSourceCode.startsWith('export ');

            context.report({
              node: variableNode,
              messageId: 'preferNamedExport',
              data: { variableName },
              fix(fixer) {
                const fixers = [
                  !isAlreadyBeignExported &&
                    fixer.insertTextBefore(variableNode, 'export '),
                  fixer.remove(node),
                ];
                return fixers.filter(Boolean) as TSESLint.RuleFix[];
              },
            });
          }
        }
      },
    };
  },
};

export = rule;
