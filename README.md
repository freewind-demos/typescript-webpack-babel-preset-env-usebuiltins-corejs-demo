TypeScript Webpack Babel Preset Env "useBuiltIns" "corejs" Demo
===================================

corejs文件还是比较大的，即使在webpack的production模式下，生成的文件大小也为159K左右。

所以真实项目中可能需要结合别的工具（如babel）按需导入。这里使用`@babel/preset-env`来处理。

```
npm install
npm run demo
```

注意产生的warning:

```
WARNING (@babel/preset-env): The `corejs` option only has an effect when the `useBuiltIns` option is not `false`


  When setting `useBuiltIns: 'usage'`, polyfills are automatically imported when needed.
  Please remove the direct import of `core-js` or use `useBuiltIns: 'entry'` instead.

```

在bundle*.js中搜索：`/***/ "./node_modules/core-js/`

1. bundle-false.js: 568
1. bundle-entry.js: 505
1. bundle-usage.js: 101

看起来`entry/usage`都有用，但usage效果更好。

`@babel/preset-env`的options中一些发现：

1. 如果`useBuiltIns`为`false`，则`corejs`配置不生效
2. 如果`useBuiltIns`为`usage`，则代码中不需要写`import 'core-js'`
3. corejs.version一般只写前两位，会影响到被引入的具体polyfill
