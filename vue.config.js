const { defineConfig } = require('@vue/cli-service')
const { join } = require('path')
function resolve(path) {
  return join(__dirname, path)
}
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club/',
        changeOrigin: true
      }
    }
  },
  chainWebpack(config) {
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  configureWebpack: {
    module: {
      unknownContextCritical: false
    }
  },
  css: {
    loaderOptions: {
      css: {
        modules: {
          auto: true,
          localIdentName: '[path][name]__[local]--[hash:base64:5]'
        }
      }
    }
  }
})
