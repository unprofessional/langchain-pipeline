// @ts-ignore
import importPlugin from 'eslint-plugin-import';
import nPlugin from 'eslint-plugin-n';
import promisePlugin from 'eslint-plugin-promise';
import standard from 'eslint-config-standard';

export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    plugins: {
      import: importPlugin,
      n: nPlugin,
      promise: promisePlugin,
    },
    settings: standard.settings ?? {}, // Ensure StandardJS settings are included (if any)
    rules: {
      ...standard.rules, // Apply StandardJS rules
      'padded-blocks': 'off',
      'no-trailing-spaces': 'off',
      'arrow-body-style': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'no-underscore-dangle': 'warn',
      'comma-dangle': ['error', 'always-multiline'],
      semi: ['error', 'always'],
      'space-before-function-paren': ['error', 'never'],
      'max-len': [
        'warn',
        {
          code: 150,
          ignoreRegExpLiterals: true,
          ignoreTemplateLiterals: true,
          ignoreTrailingComments: true,
          ignoreUrls: true,
        },
      ],
    },
  },
];
