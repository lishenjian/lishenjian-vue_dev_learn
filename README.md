# vue 源码学习

## 脚本
### package.json
* `npm run dev:cjs` 编译成运行时+编译的 vue 包：web/entry-runtime-with-compiler.js

### srcipt/config.js
* rollup 配置文件初始化地方，通过不同的 package.json TARGET 参数，构建对应的配置文件
* builds 变量配置相中 format 参数
  * amd – 异步模块定义，用于像RequireJS这样的模块加载器
  * cjs – CommonJS，适用于 Node 和 Browserify/Webpack
  * esm – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入
  * iife – 一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
  * umd – 通用模块定义，以amd，cjs 和 iife 为一体
  * system - SystemJS 加载器格式


## 编译类型
### 运行时编译
入口：src/platforms/web/entry-runtime-with-compiler.js
#### 装载 $mount
* vue 给 el 做了限制：el 不能挂载在 body 和 html 上
* 如果没有定义 render 方法，把 el 或者 template 转成 render 方法