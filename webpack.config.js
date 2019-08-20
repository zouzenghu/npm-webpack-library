const path = require('path');
const WebpackHtmlPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.ts'
  },
  //防止反复打包，如我们存在一个库而另一个使用该插件的项目也存在相同的库，就会出现打包两个相同库的情况
  //将库名在下方声明，这样我们就共享一个库，但是注意库名必须和插件一致的
  externals: [],
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: './[name].js',
    library: 'library',
    libraryTarget: 'umd'
  },
  devServer: {
    open: true,
    hot: true,
    host: '0.0.0.0',
    port: 8080,
    hotOnly: true, //禁止浏览器自动刷新
    contentBase: path.join(process.cwd(), "dist"),
  },
  module: {
    rules: [{
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 2048,
            fallback: "file-loader",
            outputPath: "./images",
            name: "[name].[ext]"
          }
        }
      }, {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: ["img:src", "img:data-src", "audio:src"],
            minimize: true
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
};