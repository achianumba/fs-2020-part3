module.exports = {
  "env": {
    "node": true,
    "commonjs": true,
    "es6": true,
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
  },
  "parserOptions": {
    "ecmaVersion": 2018,
  },
  "rules": {
    "indent": ["error", 2],
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
  },
};
