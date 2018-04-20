module.exports = {
  root: true,
  extends: 'standard',
  plugins: [
    'html'
  ],
  env: {
    browser: true, // 浏览器环境
    node: true // node环境
  },
  globals: {
    $: true // 全局变量
  },
  rules: {
    indent: ['error', 2], // 2个缩进
    // 'eol-last': ['error', 'never'] // 不需要换行
  }
}
