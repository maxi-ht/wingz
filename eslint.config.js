/** @type {import('eslint').Linter.FlatConfig} */

import js from "@eslint/js"; // Importar las configuraciones recomendadas de ESLint
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'; // Importar Next.js core web vitals
import typescriptPlugin from '@typescript-eslint/eslint-plugin'; // Importar el plugin de TypeScript
import { FlatCompat } from "@eslint/eslintrc"; // Importar FlatCompat para manejar configuraciones antiguas

const compat = new FlatCompat(); // Crear una instancia de FlatCompat

const config = [
  // Añadir la configuración recomendada de ESLint
  js.configs.recommended,
  
  // Configuración para TypeScript
  {
    languageOptions: {
      globals: {
        node: true,
        es6: true, // Soporte para ES6
      },
      parser: '@typescript-eslint/parser', // Usar el parser de TypeScript
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    files: ['**/*.ts', '**/*.tsx'], // Aplica las reglas a archivos TypeScript
    rules: {
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/ban-ts-comment': ['off'],
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
  
  // Configuración de Next.js core web vitals
  {
    files: ['**/*.js', '**/*.jsx'], // Aplica las reglas a archivos JavaScript
    languageOptions: {
      globals: {
        node: true,
        es6: true, // Soporte para ES6
      },
    },
    rules: {
      // Aquí puedes añadir reglas específicas para JavaScript si es necesario
    },
  },

  // Añadir configuraciones de Next.js directamente
  ...nextCoreWebVitals.overrides,

  // Añadir configuraciones recomendadas de TypeScript directamente
  ...typescriptPlugin.configs.recommended.overrides,
];

// Si necesitas incluir alguna configuración de terceros que use `extends`
export default [
  ...config,
  ...compat.extends("eslint-config-my-config"), // Reemplaza con la configuración que estás usando, si es necesario
];
