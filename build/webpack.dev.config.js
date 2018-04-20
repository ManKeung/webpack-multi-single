const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin') // css提取
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge') // 生产开发
const path = require('path')
const webpack = require('webpack')
const proxy = require('./proxy')
const historyFallback = require('./historyfallback')
const extractSass = new ExtractTextWebpackPlugin({
  filename: 'css/[name]-bundle-[hash:5].css'
})

const baseConfig = {
  entry: {
    react: ['react']
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'js/[name]-bundle-[hash:5].js'
  },

  devtool: 'cheap-module-source-map', // js 调试 开发可选择 有点损耗开发性能（刚开始比较慢）

  devServer: {
    // inline: false, // 页面里显示打包状态
    port: 9001, // 端口
    overlay: true, // 浏览器代码错误提示
    proxy: proxy, // 接口
    hot: true,
    hotOnly: true,
    historyApiFallback: historyFallback
  },

  resolve: { // 解析本地 libs 里的第三方库
    alias: {
      jquery$: path.resolve(__dirname, '../src/libs/jquery.min.js')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, '../src/')],
        exclude: [path.resolve(__dirname, '../src/libs')],
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter')
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('postcss-cssnext')()
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash:5].[ext]',
              outputPath: 'assets/imgs/'
            }
          }
        ]
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].[ext]',
              limit: 5000,
              outputPath: 'assets/fonts/'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'img:data-src']
            }
          }
        ]
      }
    ]
  },

  plugins: [
    extractSass,

    new webpack.ProvidePlugin({
      $: 'jquery'
    }),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin()
  ]
}

const generatPage = function({
  title = '',
  entry = '',
  template = './index.html',
  name = '',
  chunks = []
} = {}) {
  return {
    entry,
    plugins: [
      new HtmlWebpackPlugin({
        chunks,
        template,
        title,
        minify: { // 压缩
          collapseWhitespace: true
        },
        filename: name + '.html'
      })
    ]
  }
}

const pages = [
  generatPage({
    title: 'page A',
    entry: {
      a: './src/pages/a'
    },
    name: 'a',
    chunks: ['react', 'a']
  }),

  generatPage({
    title: 'page B',
    entry: {
      b: './src/pages/b'
    },
    name: 'b',
    chunks: ['react', 'b']
  }),

  generatPage({
    title: 'page C',
    entry: {
      c: './src/pages/c'
    },
    name: 'c',
    chunks: ['react', 'c']
  })
]

// console.log(merge([baseConfig].concat(pages)))
module.exports = merge([baseConfig].concat(pages))
