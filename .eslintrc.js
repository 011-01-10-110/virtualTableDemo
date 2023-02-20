module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-essential',
  ],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'max-len': ['warn', {
      code: 180, ignoreComments: true, ignoreUrls: true, ignoreTemplateLiterals: true, ignoreStrings: true,
    }],
    'no-plusplus': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['off'],
    'no-undef': ['warn'],

    // 以下是airbnb-base对js的校验，需要替换成对应ts的
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
