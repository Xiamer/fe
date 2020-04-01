module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  plugins: ['vue'],
  rules: {
    // 强制，单引号
    'quotes': ['error', 'single'],
    // 强制，分号
    'semi': ['error', 'always'],
    // 强制，不尾随逗号
    'comma-dangle': ['error', 'never'],
    // 强制，2 个空格缩进
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    // 警告，定义了未使用的变量
    'no-unused-vars': 'warn',
    'no-debugger': 'warn',
    // 警告，出现了 console 语句
    'no-console': 'warn',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/no-unused-vars': 'error',
    'vue/html-indent': 'error',
    'vue/no-v-html': 'off',
    'vue/script-indent': ['error', 2, {
      'switchCase': 1,
    }],
  },
  globals: {
    $nuxt: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
