<template>
  <div id="app">
    <el-container>
      <el-aside style="width: 65px;">
        <TheMenu />
      </el-aside>
      <router-view />
    </el-container>
  </div>
</template>

<script>
import TheMenu from './components/TheMenu.vue';

export default {
  components: {
    TheMenu
  }
};
</script>

<style>
* {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
/* 高度调整 */
html,
body,
#app,
.el-container,
.el-row {
  height: 100%;
  margin: 0;
  padding: 0;
}
.el-textarea,
.el-textarea__inner {
  height: 100%;
}

/* 输入框边框 */
.el-input__inner,
.el-textarea__inner {
  border: none;
  padding-left: 0;
}

/* 自定义title和content显示 */
.my-title,
.el-input--small .el-input__inner {
  margin: 0;
  padding: 0;
  font-size: 25px;
  font-weight: bold;
  height: 30px;
  line-height: 30px;
  color: #000000;
}
.my-content,
.el-input--small .el-textarea__inner {
  margin: 0;
  padding: 0;
}
</style>
