const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  //防止反复打包，如我们存在一个库而另一个使用该插件的项目也存在相同的库，就会出现打包两个相同库的情况
  //将库名在下方声明，这样我们就共享一个库，但是注意库名必须和插件一致的
  externals: [],
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: './dist/[name].js',
    library: 'library',
    libraryTarget: 'umd'
  }
};