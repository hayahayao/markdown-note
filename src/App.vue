<template>
  <div id="app">
    <el-container>
      <TheMenu />
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
html,
body,
#app,
.el-container {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
