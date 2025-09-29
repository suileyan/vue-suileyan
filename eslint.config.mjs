// 针对 Vue 3 + TS + Prettier 的 ESLint 扁平配置
import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'
import vueParser from 'vue-eslint-parser'

export default [
  { ignores: ['dist/**', 'node_modules/**', 'lang/**', '**/*.d.ts'] },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tsParser, ecmaVersion: 'latest', sourceType: 'module' },
    },
    rules: {
      // 在 <script setup lang="ts"> 中依赖 TS 处理全局/类型
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // 启用类型感知的校验（TS >= 5，@typescript-eslint v8）
        projectService: true,
      },
    },
    plugins: { '@typescript-eslint': ts, prettier },
    rules: {
      'prettier/prettier': 'warn',
      // 使用 TS 版未使用变量规则；关闭与之冲突的基础规则
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      'no-undef': 'off',
      'no-unused-vars': 'off',
      // 依赖类型信息的正确性规则
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
    },
  },
  {
    files: ['src/**/*.{ts,tsx,vue}'],
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
      },
    },
    plugins: { prettier },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/attributes-order': 'off',
      // 以 Prettier 为准：关闭模板中的样式类规则，减少噪音
      'vue/html-indent': 'off',
      'vue/first-attribute-linebreak': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
      'prettier/prettier': 'warn',
    },
  },
  {
    files: [
      '*.cjs',
      '*.mjs',
      'vite.config.ts',
      'eslint.config.mjs',
      'tailwind.config.cjs',
      'postcss.config.cjs',
    ],
    languageOptions: { globals: { module: 'readonly', require: 'readonly', process: 'readonly' } },
  },
  {
    files: ['**/*.d.ts'],
    rules: { 'no-unused-vars': 'off', '@typescript-eslint/no-unused-vars': 'off' },
  },
]
