// See documents at https://eslint.org/docs/user-guide/configuring
module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "extends": [
    "react-app",
    "airbnb",
  ], // extend the set of enabled rules
  "globals": {
    "fin": true
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "unused-imports",
    "simple-import-sort",
  ], // exports rules
  "env": { // defines global variables that are predefined
    "node": true, // Node.js global variables and Node.js scoping
    "browser": true, // browser global variables
    "es6": true // enable all ECMAScript 6 features
  },
  "rules": {
    "jsx-a11y/anchor-has-content": "off",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-angle-bracket-type-assertion": "off",
    "array-element-newline": [1, "consistent"],
    "object-curly-newline": ["error", {
      "ObjectExpression": { "multiline": true, "minProperties": 1 },
      "ObjectPattern": { "multiline": true, "minProperties": 1 },
      "ImportDeclaration": { "multiline": true, "minProperties": 1 },
      "ExportDeclaration": { "multiline": true, "minProperties": 1 }
    }],
    "quotes": ["error", "single"],
    "jsx-quotes": ["error", "prefer-double"],
    "semi": [
      "error",
      "always"
    ],
    "eol-last": [
      "error",
      "always"
    ],
    "max-len": 0,
    "import/no-absolute-path": "off",
    "import/no-unresolved": "off",
    "unused-imports/no-unused-imports": ["error", { "varsIgnorePattern": "^React$" }],
    "unused-imports/no-unused-vars": ["error", { "varsIgnorePattern": "^React$" }],
    "no-unused-vars": ["error", { "varsIgnorePattern": "^React$" }],
    "simple-import-sort/sort": "error",
    "no-underscore-dangle": 0,
    "react/prefer-stateless-function": 0,
    "react/no-array-index-key": 0,
    "import/prefer-default-export": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "react/forbid-prop-types": 0,
    "no-restricted-globals": 0,
    "no-case-declarations": 0,
    "no-console": 0,
    "no-alert": 0,
    "linebreak-style": ["error", "unix"],
    "react/jsx-one-expression-per-line": [
      1,
      {
        "allow": "single-child"
      }
    ],
    "react/jsx-max-props-per-line": [
      1,
      {
        "maximum": 3
      }
    ],
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "react/jsx-props-no-spreading": 0,
  }
}