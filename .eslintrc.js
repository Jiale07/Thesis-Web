module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: [
    'vue',
  ],
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    // 'plugin:vue/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  settings: {
    'vue': {
      'version': '2.6.12',
    },
  },
}
