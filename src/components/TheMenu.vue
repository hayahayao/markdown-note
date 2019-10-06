<template>
  <el-menu collapse router>
    <BaseMenuItem v-for="item in items" :key="item" :index="item" :type="item" />
  </el-menu>
</template>

<script>
import BaseMenuItem from "./BaseMenuItem.vue";
export default {
  data() {
    return {
      items: ['new', 'favorite', 'note', 'notebook', 'tag'],
    }
  },
  components: {
    BaseMenuItem
  },
};
</script>

<style>
.el-menu {
  height: 100%;
}
</style>
