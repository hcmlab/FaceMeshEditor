import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    rules: {
      "no-unused-vars": [
        "error", {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
      }],
      "@typescript-eslint/no-unused-vars": [
        "error", {
          "argsIgnorePattern": "^_",
      }],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
