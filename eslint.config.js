export default [
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      "airbnb-base",
      "airbnb-typescript/base"
    ],
    rules: {
      "padded-blocks": "off",
      "no-trailing-spaces": "off",
      "arrow-body-style": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "import/no-extraneous-dependencies": "off",
      "import/prefer-default-export": "warn",
      "@typescript-eslint/naming-convention": "warn",
      "no-underscore-dangle": "warn",
      "max-len": [
        "warn",
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
