const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin') // css提取
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge') // 生产开发
const path = require('path')
const glob = require('glob-all')
const webpack = require('webpack')
const PurifyCSS = require('purifycss-webpack')
const HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const extractSass = new ExtractTextWebpackPlugin({
  filename: 'css/[name]-bundle-[hash:5].css'
    // allChunks: false // 提取css范围
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
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              singleton: true, // 同一个标签
              // transform: './css.transform.js' // 路径
            }
          },
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-cssnext'),
                  require('postcss-sprites')({
                    spritePath: 'dist/assets/imgs/sprites',
                    retina: true // 视网膜屏 @2x
                  }), // 雪碧图
                ]
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].[ext]',
              limit: 1000,
              outputPath: 'assets/imgs/'
            }
          },
          {
            loader: 'img-loader',
            options: {
              pngquant: 80
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

    new PurifyCSS({
      paths: glob.sync([
        './*html',
        './src/*.js'
      ])
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),

    new HtmlInlineChunkPlugin({
      inlineChunks: ['manifest']
    }),

    new webpack.optimize.UglifyJsPlugin(),

    new CleanWebpackPlugin(['../dist'])
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
