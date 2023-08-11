# eslint-plugin-prefer-named-export

<!--
[![npm version](https://img.shields.io/npm/v/eslint-plugin-prefer-named-export.svg)](https://www.npmjs.com/package/eslint-plugin-prefer-named-export)
[![Downloads/month](https://img.shields.io/npm/dm/eslint-plugin-prefer-named-export.svg)](http://www.npmtrends.com/eslint-plugin-prefer-named-export)
[![Build Status](https://travis-ci.org/richardaum/eslint-plugin-prefer-named-export.svg?branch=master)](https://travis-ci.org/richardaum/eslint-plugin-prefer-named-export)
[![Coverage Status](https://codecov.io/gh/richardaum/eslint-plugin-prefer-named-export/branch/master/graph/badge.svg)](https://codecov.io/gh/richardaum/eslint-plugin-prefer-named-export)
[![Dependency Status](https://david-dm.org/richardaum/eslint-plugin-prefer-named-export.svg)](https://david-dm.org/richardaum/eslint-plugin-prefer-named-export)
-->

## Installation

Use [npm](https://www.npmjs.com/) or a compatibility tool to install.

```
$ npm install --save-dev eslint eslint-plugin-prefer-named-export
```

### Requirements

- Node.js v8.10.0 or newer versions.
- ESLint v5.16.0 or newer versions.

## Usage

Write your config file such as `.eslintrc.yml`.

```yml
plugins:
  - prefer-named-export
rules:
  prefer-named-export/example-rule: error
```

See also [Configuring ESLint](https://eslint.org/docs/user-guide/configuring).

## Configs

- `prefer-named-export/recommended` ... enables the recommended rules.

## Rules

<!--RULE_TABLE_BEGIN-->

### Possible Errors

| Rule ID                                                                        | Description                                                                                                                                                                                                                                                    |       |
| :----------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---: |
| [prefer-named-export/prefer-named-export](./docs/rules/prefer-named-export.md) | This rule enforces the use of named exports instead of default exports. It checks for export statements that use the export default syntax with an identifier as the default export, and suggests exporting the variable directly with a named export instead. | ⭐️✒️ |

<!--RULE_TABLE_END-->

## Semantic Versioning Policy

This plugin follows [Semantic Versioning](http://semver.org/) and [ESLint's Semantic Versioning Policy](https://github.com/eslint/eslint#semantic-versioning-policy).

## Changelog

- [GitHub Releases]()

## Contributing

Welcome your contribution!

See also [ESLint Contribution Guide](https://eslint.org/docs/developer-guide/contributing/).

### Development Tools

- `npm test` runs tests.
- `npm run update` updates the package version. And it updates `src/configs/recommended.ts`, `lib/index.ts`, and `README.md`'s rule table. See also [npm version CLI command](https://docs.npmjs.com/cli/version).
- `npm run add-rule <RULE_ID>` creates three files to add a new rule.
