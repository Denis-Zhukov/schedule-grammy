import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.ts', '.tsx', '.json'],
        },
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'import/no-dynamic-require': 'warn',
    },
  },
  {
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'arrow-parens': ['error', 'always'],
      'linebreak-style': ['error', 'windows'],
      'no-console': ['warn'],
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal', 'sibling', 'parent', 'index'],
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
    },
  },
];
