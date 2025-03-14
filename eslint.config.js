// @ts-ignore
import standard from 'eslint-config-standard';
import importPlugin from 'eslint-plugin-import';
import jestPlugin from 'eslint-plugin-jest';
import nPlugin from 'eslint-plugin-n';
import promisePlugin from 'eslint-plugin-promise';
// import jestRecommended from 'eslint-plugin-jest/configs/recommended'; // FIXME: not found?

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
      jest: jestPlugin,
    },
    settings: standard.settings ?? {}, // Ensure StandardJS settings are included (if any)
    rules: {
      ...standard.rules, // Apply StandardJS rules
      // ...jestRecommended.rules, // Merge Jest recommended rules
      quotes: ['error', 'single', { avoidEscape: true }],
      'padded-blocks': 'off',
      'no-trailing-spaces': 'off',
      'arrow-body-style': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'no-underscore-dangle': 'warn',
      'comma-dangle': ['error', 'always-multiline'],
      'no-unused-vars': 'warn',
      semi: ['error', 'always'],
      'space-before-function-paren': ['error', {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      }],
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
