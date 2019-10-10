<template>
  <el-aside style="width: 65px;">
    <el-menu collapse>
      <BaseMenuItem v-for="item in items" :key="item" :index="item" :type="item" />
    </el-menu>
  </el-aside>
</template>

<script>
import BaseMenuItem from "./BaseMenuItem.vue";
export default {
  data() {
    return {
      items: ['new', 'favorite', 'note', 'notebook'],
    }
  },
  components: {
    BaseMenuItem
  },
};
</script>

<style scoped>
.el-aside,
.el-menu {
  height: 100%;
}
</style>
