import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.browser },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
      "eqeqeq": "error",
      "curly": "error",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-function-return-type": "warn",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];