/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:sonarjs/recommended-legacy", // legacy to support ESLint 8
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  overrides: [
    {
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
      files: ["*.js", "*.cjs", "*.mjs"],
    },
    {
      files: ["*.test.ts"],
      rules: {
        "@typescript-eslint/unbound-method": "off",
        "sonarjs/no-nested-functions": "off",
        "sonarjs/todo-tag": "off",
      },
    },
  ],
  rules: {
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      { allowNumber: true },
    ],
  },
};
