module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended'
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
    "ember-suave/prefer-destructuring": "off",
    "ember-suave/require-access-in-comments": "off",
    "generator-star-spacing": ["error", "both"],
    "key-spacing": "off",
    "new-cap": "off",
    "no-constant-condition": ["error", { "checkLoops": false }],
    "no-multiple-empty-lines": "off",
    "object-curly-spacing": "off",
    "operator-linebreak": "off",
    quotes: "off",
    "space-before-function-paren": ["error", { "anonymous": "ignore", "named": "never" }],
    "spaced-comment": "off",
    strict: "off",
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js'
      ],
      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**'
      ],
      parserOptions: {
        sourceType: 'script'
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here
      })
    }
  ]
};
