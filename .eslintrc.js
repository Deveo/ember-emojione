module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  extends: [
    "eslint:recommended",
    "plugin:ember-suave/recommended"
  ],
  env: {
    "browser": true
  },
  rules: {
    "array-bracket-spacing": ["error", "never"],
    "arrow-parens": "off",
    "camelcase": "off",
    "comma-dangle": "off",
    "curly": "off",
    "ember-suave/no-const-outside-module-scope": "off",
    "ember-suave/require-access-in-comments": "off",
    "generator-star-spacing": ["error", "both"],
    "key-spacing": "off",
    "no-constant-condition": ["error", { "checkLoops": false }],
    "no-multiple-empty-lines": "off",
    "operator-linebreak": "off",
    quotes: "off",
    "space-before-function-paren": ["error", { "anonymous": "ignore", "named": "never" }],
    "spaced-comment": "off",
    strict: "off",
  },
  globals: {
    // "Autolinker": true,
  }
};
