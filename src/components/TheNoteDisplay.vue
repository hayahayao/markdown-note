<template>
  <el-col :span="11">
    <el-divider></el-divider>
    <h1 class="my-title">{{ title }}</h1>
    <div class="my-content" v-html="htmlContent"></div>
  </el-col>
</template>

<script>
import marked from 'marked'

export default {
  computed: {
    title() {
      return this.$store.getters['note/title']
    },
    htmlContent() {
      return marked(this.$store.getters['note/content'])
    },
  },
}
</script>
