import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: {
      react: reactPlugin
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      // Possible Errors
      'no-cond-assign': 'error',
      'no-control-regex': 'error',
      'no-dupe-args': 'error',
      'no-dupe-keys': 'error',
      'no-empty-character-class': 'error',
      'no-empty': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-semi': 'error',
      'no-func-assign': 'error',
      'no-inner-declarations': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-obj-calls': 'error',
      'no-sparse-arrays': 'error',
      'no-unreachable': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
      'no-unexpected-multiline': 'error',

      // Best Practices
      'block-scoped-var': 'error',
      'complexity': ['error', 40],
      'default-case': 'error',
      'dot-notation': 'error',
      'eqeqeq': 'error',
      'no-alert': 'error',
      'no-caller': 'error',
      'no-else-return': 'warn',
      'no-eq-null': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-fallthrough': 'error',
      'no-floating-decimal': 'error',
      'no-implied-eval': 'error',
      'no-iterator': 'error',
      'no-lone-blocks': 'error',
      'no-loop-func': 'error',
      'no-multi-str': 'error',
      'no-global-assign': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-new': 'error',
      'no-octal-escape': 'error',
      'no-octal': 'error',
      'no-param-reassign': ['error', { props: false }],
      'no-proto': 'error',
      'no-redeclare': 'error',
      'no-return-assign': 'error',
      'no-script-url': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-useless-call': 'error',
      'no-with': 'error',
      'radix': 'error',
      'wrap-iife': 'error',
      'yoda': 'error',

      // Variables
      'no-delete-var': 'error',
      'no-label-var': 'error',
      'no-shadow-restricted-names': 'error',
      'no-shadow': 'error',
      'no-undef-init': 'error',
      'no-undef': 'error',
      'no-unused-vars': 'error',

      // Stylistic Issues
      'brace-style': 'error',
      'camelcase': ['error', { properties: 'always' }],
      'comma-spacing': ['error', { before: false, after: true }],
      'consistent-this': ['error', 'self'],
      'eol-last': 'error',
      'func-style': ['error', 'declaration'],
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'max-nested-callbacks': ['error', 4],
      'new-cap': 'off',
      'new-parens': 'error',
      'no-array-constructor': 'error',
      'no-lonely-if': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-nested-ternary': 'error',
      'no-object-constructor': 'error',
      'no-trailing-spaces': 'error',
      'no-unneeded-ternary': 'error',
      'quotes': ['error', 'single', 'avoid-escape'],
      'semi-spacing': ['error', { before: false, after: true }],
      'semi': ['error', 'always'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-before-blocks': ['error', 'always'],
      'space-before-function-paren': ['error', 'never'],
      'space-infix-ops': 'error',
      'space-unary-ops': ['error', { words: true, nonwords: false }],
      'spaced-comment': ['error', 'always'],

      // ECMAScript 6
      'arrow-spacing': 'error',
      'constructor-super': 'error',
      'no-class-assign': 'error',
      'no-const-assign': 'error',
      'no-this-before-super': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-const': 'error',
      'prefer-spread': 'error',
      'require-yield': 'error',

      // Legacy
      'max-len': ['warn', 120, 4, { ignoreComments: true, ignoreUrls: true }],
      'max-params': ['error', 4],
      'no-bitwise': 'error',

      // React
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error'
    }
  }
];
