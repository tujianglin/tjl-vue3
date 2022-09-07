module.exports = {
  root: true,
  // 继承
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  // 自定义语法
  customSyntax: 'postcss-html',
  // 规则
  rules: {
    // 禁止未知的伪元素选择器
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    // 禁止未知单位
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
  },
  // 忽略
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
};
