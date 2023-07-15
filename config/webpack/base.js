const { webpackConfig, merge } = require('@rails/webpacker')

const vueConfig = require('./loaders/vue')

const customConfig = {
  resolve: {
    extensions: [
      // '.vue',
      '.js',
      '.sass',
      '.scss',
      '.css',
      '.module.sass',
      '.module.scss',
      '.module.css',
      '.png',
      '.svg',
      '.gif',
      '.jpeg',
      '.jpg'
    ]
  }
}

module.exports = merge(vueConfig, webpackConfig, customConfig)
