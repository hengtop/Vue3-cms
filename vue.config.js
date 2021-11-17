module.exports = {
  outputDir: './build',
  devServer: {
    open: false, // 是否打开浏览器;
    hotOnly: true, // 是否热更新;
    proxy: {
      '/api': {
        // 路径中有 /api 的请求都会走这个代理 , 可以自己定义一个,下
        target: 'http://xxxxx:5000/',
        secure: false,
        changeOrigin: true, // 是否更新代理后请求的headers中host地址
        ws: true, // 是否启用  websockets;
        pathRewrite: {
          // 去掉 路径中的  /api  的这一截，毕竟真实url是没有这个前缀的
          '^/api': ''
        }
      },
      '/fileApi': {
        // 路径中有 /api 的请求都会走这个代理 , 可以自己定义一个,下
        target: 'http://xxxxx:9001/',
        secure: true,
        changeOrigin: true, // 是否更新代理后请求的headers中host地址
        ws: true, // 是否启用  websockets;
        pathRewrite: {
          // 去掉 路径中的  /api  的这一截，毕竟真实url是没有这个前缀的
          '^/fileApi': ''
        }
      }
    }
  }
};
