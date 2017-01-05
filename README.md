# ALLSO
**超实用双栏聚合搜索引擎**

![ALLSO Logo](https://cloud.githubusercontent.com/assets/12909077/17729102/0c5bad68-6495-11e6-9d54-c3dba7709a1c.jpg)

输入一个关键字，ALLSO 会自动提交给左右两个搜索引擎，同时返回他们的搜索结果！

页面一分为二，充分利用屏幕显示资源。同时浏览 2 个搜索引擎，资源互补，方便实用！

并且网页 UI 做的相当漂亮，简洁。绝对会让你爱不释手！

![预览](https://cloud.githubusercontent.com/assets/12909077/17729212/a42c4c9c-6495-11e6-83d0-f61fb88333bc.png)


## 链接地址

**开始使用 ALLSO：<http://h2y.github.io/allso>**

Github 项目主页：[h2y/allso](https://github.com/h2y/allso/)

个人网站发布页面：<https://hzy.pw/p/1389>


## 特色功能介绍

- **即时搜索**

输入关键字的同时，ALLSO 就会立即展开搜索，当你输完关键字，搜索结果已经展示在了屏幕上。让你享受最快捷的搜索体验，谁用谁知道，实用至极！

*不过在 IE 上不会开启此功能，因为我不喜欢 IE。*

- **单页面技术**

类似功能的网站在网上有不少，做得很差并且有个共同的缺点：每进行一次搜索，都会将网页彻底刷新一次，这样使得每个搜索结果都是一个独立的网页，有利于网站 SEO。但对于我们用户而言，没有任何的意义，只会增加搜索耗时。

ALLSO 采用纯单页面实现，加载一次后页面 0 刷新。

- **视框最佳化处理**

对搜索引擎返回的页面进行切割，去除边缘的无用区域，仅保留我们想看的内容。

> **特别说明：**现在不再支持免翻墙上谷歌

> 由于 GFW 的封杀，我也木有办法 T.T

## 常见问题

- **ALLSO 不支持 Google 源站？**

是的，由于 Google 页面标明了禁止被引用在站外 iframe 中，根据互联网协议，ALLSO 不能抓取并显示其搜索内容。

谷歌墙路线实际是使用了 ASK.com 服务器作为中转。（[https://www.search.ask.com](https://www.search.ask.com)）

- **如何将 ALLSO 设置为浏览器默认搜索引擎**

ALLSO 会响应响应 Hash 请求。例如，你可以访问 [http://h2y.github.io/allso#Moshel](http://h2y.github.io/allso#Moshel)，即可立即展开对 *Moshel* 的搜索。

所以，你可以在浏览器中这样设置，使 ALLSO 成为你的默认搜索引擎：*（浏览器设置 -> 管理搜索引擎）*

![设置为浏览器默认搜索引擎](https://cloud.githubusercontent.com/assets/12909077/17730376/0cfe6e9e-649b-11e6-9fdc-32bde58340ec.JPG)

## 开发说明

使用 glup 进行前端打包。/lib 为源文件目录，/dist 为生成后的文件目录，/static 为不参与打包的静态资源。

```shell
npm install
npm run start # npm run build
```

## 相关推荐

**我的 UserScript 浏览器脚本**

这里是数个独立的 UserScript 浏览器脚本，为浏览器实现了各种强大的的功能。

我的 greasyfork 主页： <https://greasyfork.org/zh-CN/users/19299>
