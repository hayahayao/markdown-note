<template>
  <el-menu-item :index="index" :type="type" style="padding: 0;">
    <el-tooltip :content="content" placement="right">
      <router-link :to="to">
        <i :class="icon"></i>
      </router-link>
    </el-tooltip>
  </el-menu-item>
</template>

<script>
export default {
  props: {
    index: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    to() {
      return { name: this.type }
    },
    icon() {
      let iconMap = new Map([
        ['new', 'el-icon-plus'],
        ['notes', 'el-icon-document'],
        ['notebooks', 'el-icon-notebook-2'],
        ['tags', 'el-icon-collection-tag'],
      ])
      return iconMap.get(this.type)
    },
    content() {
      let contentMap = new Map([
        ['new', '新建笔记'],
        ['notes', '笔记'],
        ['notebooks', '笔记本'],
        ['tags', '标签']
      ])
      return contentMap.get(this.type)
    },
  },
};
</script>

<style scoped>
.el-menu-item a {
  padding: 20px;
}
</style>