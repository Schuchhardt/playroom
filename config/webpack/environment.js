const { environment } = require('@rails/webpacker')
const { VueLoaderPlugin } = require('vue-loader')
const vue = require('./loaders/vue')

environment.loaders.append('vue', vue)
environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())
environment.loaders.prepend('vue', vue)
environment.loaders.get('file').use.find(item => item.loader === 'file-loader').options.esModule = false
const sassModules = ["sass", "moduleSass"]
sassModules.forEach((loader) => {
    const sassLoader = environment.loaders
      .get(loader)
      .use.find((el) => el.loader === "sass-loader");
    sassLoader.options.implementation = require("sass");
});
module.exports = environment
