const { defineConfig } = require('@vue/cli-service')
const { join } = require('path')
function resolve(path) {
  console.log(join(__dirname, path))
  return join(__dirname, path)
}
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    // config 为 webpack 配置对象
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      // 规则
      .rule('svg')
      // 忽略
      .exclude.add(resolve('src/assets/icons'))
      // 结束
      .end()
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      // 规则
      .rule('icons')
      // 正则，解析 .svg 格式文件
      .test(/\.svg$/)
      // 解析的文件
      .include.add(resolve('src/assets/icons'))
      // 结束
      .end()
      // 新增了一个解析的loader
      .use('svg-sprite-loader')
      // 具体的loader
      .loader('svg-sprite-loader')
      // loader 的配置
      .options({
        symbolId: 'icon-[name]'
      })
      // 结束
      .end()
  },
  configureWebpack: {
    module: {
      unknownContextCritical: false
    }
  },
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和 mixin
        additionalData: `
          @import "@/styles/variable.scss";
        `
      }
    }
  }
})
