# megalo-devtool

<p align="center">
  <a href="https://codecov.io/gh/megalojs/megalo-devtool">
    <img src="https://img.shields.io/npm/v/@megalo/devtool.svg?style=for-the-badge" />
  </a>
</p>

小程序调试工具，由于小程序 IDE 不方便安装插件，因此采用另开页面的方式来对 Vue 进行调试，参考 Vue Devtool 的功能。

目前支持功能：

- VM 数据查询
- VNode 数据查询
- 组件事件 数据查询
- Vuex Mutation 记录查询

目前支持平台：

- 微信小程序
- 字节跳动小程序

## 使用方法

### 添加 webpack 插件

```javascript
const DevtoolPlugin = require('@megalo/devtool/webpack-plugin');

module.exports = {
  plugins: [
    new DevtoolPlugin({
      // port: 12222,       // 默认 12222
      // host: 'xxx.xxx.xxx.xxx'  // 默认取本地 ip 地址
    }),
  ],
};
```

### 添加 Vue 插件

```javascript
import Vue from 'vue'
import DevtoolPlugin from '@megalo/devtool/vue-plugin';

Vue.use(DevtoolPlugin);
```

### 调试

- 启动小程序工程构建
- 构建完成后，打开小程序 IDE
- 关闭 IDE 对域名的校验（否则请求可能无法正常发送）
- 浏览器打开地址 `http://localhost:12222`，开始使用调试


### 界面

![image](https://user-images.githubusercontent.com/8703947/58084889-474a5f00-7bee-11e9-8348-94d6b4378dc4.png)

![image](https://user-images.githubusercontent.com/8703947/58084819-2a159080-7bee-11e9-88e8-81da8c7f8508.png)
