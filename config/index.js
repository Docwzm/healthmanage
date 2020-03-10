'use strict';

const path = require('path');

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/rpmaccount_service': {
        target: 'https://sports-qa.lifesense.com', // 接口的域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      },
      '/rpm_platform_service': {
        target: 'https://sports-qa.lifesense.com', // 接口的域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      },
    },
    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,
    cssSourceMap: true
  },

  build: {
    index: path.resolve(__dirname, '../dist/healthmanage/index.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist/healthmanage/'),
    assetsSubDirectory: './static',
    assetsPublicPath: '/healthmanage/',

    /**
     * Source Maps
     */
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    bundleAnalyzerReport: false
  }
};
