import { TSESLint } from '@typescript-eslint/experimental-utils';

const rule: TSESLint.RuleModule<'preferNamedExport', []> = {
  defaultOptions: [],

  meta: {
    type: 'problem',
    docs: {
      // TODO: write the rule summary.
      description: '',
      recommended: false,
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

export = rule;
