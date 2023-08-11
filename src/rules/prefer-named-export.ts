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
      url: '',
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
          const variable = context
            .getScope()
            .variables.find((v) => v.name === variableName);
          const variableDeclarationNode = variable?.defs[0].node.parent;

          if (variableDeclarationNode?.type === 'VariableDeclaration') {
            context.report({
              node: variableDeclarationNode,
              messageId: 'preferNamedExport',
              data: { variableName },
              fix(fixer) {
                return [
                  fixer.insertTextBefore(variableDeclarationNode, 'export '),
                  fixer.remove(node),
                ];
              },
            });
          }
        }
      },
    };
  },
};

export default rule;
