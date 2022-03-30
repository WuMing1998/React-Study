

### react基础复习
review react-hooks react-redux react-router-dom@6 redux


安装antd
```javascript
    yarn add antd react-app-rewired customize-cra babel-plugin-import
```

创建 config-overriders.js
```js
const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
);
```

修改 package.json
```json
"scripts": {
   "start": "react-app-rewired start",
   "build": "react-app-rewired build",
   "test": "react-app-rewired test",
}
```
