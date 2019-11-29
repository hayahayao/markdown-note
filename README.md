# Markdown Note

这是我在学习Vue的过程中所做的一个综合性项目。[demo地址]()

项目是一个Markdown笔记本应用。主要功能包括：


- [x] 支持使用Markdown标记语言编写笔记，并可以实时预览笔记；
- [x] 可以使用笔记本和标签两种方式对笔记进行分类以及查看；
- [x] 笔记可以在用户下次打开应用时重新加载出来。

## 运行

```
npm install
npm run serve
npm run build
```

## 技术点

- Vue + Vue Router + Vuex
- UI 部分使用了现成的 [Element](https://element.eleme.cn/#/zh-CN) 库搭建
- Markdown 到 HTML 的转换使用了 [marked](https://github.com/markedjs/marked)
- 前端存储使用 IndexDB 实现，其中：
  - 在处理对数据库的异步操作时，由于 IndexDB 原生 API 是回调式不易编写与调试，因此使用了 [idb](https://github.com/jakearchibald/idb) 这个库对其进行 Promise 式的封装

## 项目结构

```
│  App.vue                  // 项目入口
│  main.js                  // 主程序
│  router.js                // 路由配置
│
├─components
│      BaseMenuItem.vue     // 左侧菜单的基础元素
│      BooksList.vue        // 用于笔记本/标签展示的列表
│      TheMenu.vue          // 左侧菜单
│      TheNoteDisplay.vue   // 编辑笔记页面右侧的预览区
│      TheNoteInput.vue     // 编辑笔记页面左侧的编辑区
│      TheNoteMenu.vue      // 编辑笔记页面上方的菜单栏
│      TheNotesList.vue     // 用于笔记展示的列表
│
├─modules 
│      database.js          // 对 idb 的数据库操作进行封装
│
├─store                     // Vuex 状态管理
│      index.js             // 管理笔记/笔记本/标签列表
│      note.js              // 管理单个笔记信息
│
└─views
        Home.vue            // 主页面
        New.vue             // 新建笔记页面
        NewNotebook.vue     // 新建笔记本页面
        NewTag.vue          // 新建标签页面
        Notebooks.vue       // 笔记本列表页面
        Notes.vue           // 笔记列表页面
        Tags.vue            // 标签列表页面
```

