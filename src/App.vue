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
html,
body,
#app,
.el-container {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>