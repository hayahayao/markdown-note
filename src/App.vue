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
.el-input__inner {
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #dcdfe6;
}
.el-textarea__inner {
  height: 100%;
  border: none;
  border-radius: 0;
}
</style>
