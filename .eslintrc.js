module.exports = {
  root: true,
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
    "camelcase": "off",
    "ember-suave/no-const-outside-module-scope": "off",
    "ember-suave/require-access-in-comments": "off",
    "generator-star-spacing": ["error", "both"],
    "no-constant-condition": ["error", { "checkLoops": false }],
    "space-before-function-paren": ["error", { "anonymous": "always", "named": "never" }]
  },
  globals: {
    // "Autolinker": true,
  }
};
