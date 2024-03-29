module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    __DEV__: true,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier'],
  rules: {
    '@typescript-eslint/prefer-enum-initializers': 'off',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true,
        ObjectExpression: 'first',
      },
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    semi: ['error', 'never'],
    '@typescript-eslint/semi': ['error', 'never'],
    'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
    'react/prop-types': ['error', { skipUndeclared: true }],
    'react/prefer-es6-class': ['error', 'always'],
    'react/prefer-stateless-function': 'error',
    'react/self-closing-comp': 'warn',
    'react/jsx-boolean-value': 'error',
    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      },
    ],
    '@typescript-eslint/no-var-requires': 0,
    'react/jsx-no-bind': [
      'error',
      {
        ignoreRefs: true,
        allowArrowFunctions: true,
      },
    ],
    'react/jsx-pascal-case': ['error'],
    'react/jsx-no-useless-fragment': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.tsx', '.jsx'],
      },
    ],
    'react/jsx-curly-brace-presence': [
      'warn',
      { props: 'never', children: 'ignore' },
    ],
    'react/jsx-fragments': ['off', 'element'],
    'react/no-access-state-in-setstate': 'error',
    'react/no-multi-comp': 'off',
    'react/no-redundant-should-component-update': 'error',
    'react/no-this-in-sfc': 'error',
    'react/style-prop-object': 'off',
    'react/void-dom-elements-no-children': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
}
