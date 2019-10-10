<template>
  <el-menu-item :index="index" :type="type">
    <router-link :to="to">
      <i :class="icon"></i>
      <span slot="title">{{ content }}</span>
    </router-link>
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
        ['favorite', 'el-icon-star-off'],
        ['note', 'el-icon-document'],
        ['notebook', 'el-icon-notebook-2'],
      ])
      return iconMap.get(this.type)
    },
    content() {
      let contentMap = new Map([
        ['new', '新建笔记'],
        ['favorite', '收藏'],
        ['note', '笔记'],
        ['notebook', '笔记本'],
      ])
      return contentMap.get(this.type)
    },
  },
};
</script>
