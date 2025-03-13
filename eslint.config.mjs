// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import * as importPlugin from 'eslint-plugin-import';
import rxjsPlugin from 'eslint-plugin-rxjs';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'dist/**', 'node_modules/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      prettier: prettierPlugin,
      rxjs: rxjsPlugin,
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-unused-vars': 'off',

      // Import rules
      'import/no-relative-parent-imports': 'off', // We'll handle this with no-restricted-imports
      'import/no-unresolved': [
        'error',
        { ignore: ['^@core/', '^@common/', '^@shared/', '^@authentication/', '^@authorization/', '^@helpers/'] }
      ],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      // Strict enforcement of path aliases instead of relative imports
      'no-restricted-imports': ['error', { 
        patterns: [
          {
            group: ['../*', './*'], 
            message: 'Use path aliases instead of relative imports. For example, use @core/... instead of ../... or ./'
          }
        ]
      }],

      // Prettier rules
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 100,
          tabWidth: 2,
          endOfLine: 'auto', // Cambiado de 'lf' a 'auto' para mayor compatibilidad
        },
      ],

      // TypeScript rules
      '@typescript-eslint/explicit-function-return-type': [
        'warn', // Cambio de 'error' a 'warn' para ser menos estricto durante el desarrollo
        {
          allowExpressions: true, // Permitir expresiones sin tipo de retorno explícito
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': [
        'warn', // Cambio de 'error' a 'warn'
        {
          fixToUnknown: false,
          ignoreRestArgs: true, // Permitir any en argumentos rest
        },
      ],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/naming-convention': [
        'warn', // Cambio de 'error' a 'warn'
        {
          selector: 'default',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          // Hacer el prefijo "I" opcional
          custom: {
            regex: '^I?[A-Z][a-zA-Z]*$',
            match: true,
          },
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE', 'PascalCase'], // Permitir PascalCase también
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        }
      ],
      
      // Reglas de seguridad para TypeScript menos estrictas durante desarrollo
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
    },
  },
);