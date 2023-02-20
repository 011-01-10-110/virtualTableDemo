const sortOrderSmacss = require('stylelint-config-property-sort-order-smacss/generate');

module.exports = {
  extends: 'stylelint-config-standard',
  plugins: [
    'stylelint-order'
  ],
  overrides: [
    {
      'files': ['**/*.vue', '**/*.css'],
      'customSyntax': 'postcss-html',
    }
  ],
  rules: {
    'order/properties-order': [
      sortOrderSmacss()
    ],
    'selector-pseudo-class-no-unknown': [true, {
      'ignorePseudoClasses': ['deep']
   }],
  },
}