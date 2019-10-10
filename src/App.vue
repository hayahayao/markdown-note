<template>
  <div id="app">
    <BaseErrorAlert />
    <router-view />
  </div>
</template>

<script>
import BaseErrorAlert from './components/BaseErrorAlert.vue'

export default {
  components: {
    BaseErrorAlert,
  },
}
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

/* 实现水平垂直居中 */
.center-wrapper {
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
</style>
