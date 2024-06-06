const globals = require("globals");

module.exports = {
  env: {
    browser: true,
  },
  globals: globals.browser,
  plugins: [
    "import",
    "@typescript-eslint",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "no-unused-vars": "off"
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  settings: {
    "import/resolver": {
      "typescript": true,
      "node": true,
    }
  }
};