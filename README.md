# webpack-multi-single

webpack 多页面开发单配置

## 文件介绍

### .deitorconfig

代码编辑规范

### .gitignore

git上传规避

### package.json

1. dependencies --> 生产依赖
2. devDependencies --> 开发依赖
3. $ npm run dev --> 开发
4. $ npm run build --> 打包
5. $ npm run stats --> 打包结构分析
  + [analyse]('http://webpack.github.io/analyse/')
  + [webpck-chart]('https://alexkuz.github.io/webpack-chart/')
  + [webpck-chart]('https://alexkuz.github.io/stellar-webpack/')
6. browserslist --> 兼容到浏览器版本

### .babelrc

编译ES6/ES7

### .eslintrc.js

ESLint代码规范

### index.html

html文件

### build

#### webpack.common.conf.js

公共webpack.config

#### webpack.dev.conf.js

开发webpack.config

#### webpack.prod.conf.js

生产webpack.config

### node_modules

依赖包

### src

源代码

#### assets

静态资源

#### fonts

字体文件

#### imgs

图片文件

#### common

公共方法

#### components

公共模块

#### css

css样式

#### libs

第三方JS

#### index.js

入口文件

#### pages

页面文件
