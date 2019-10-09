<template>
  <el-col :span="11">
    <el-input placeholder="标题" v-model="title"></el-input>
    <el-divider></el-divider>
    <el-input placeholder="Markdown内容" type="textarea" v-model="content"></el-input>
  </el-col>
</template>

<script>
export default {
  computed: {
    title: {
      get() {
        return this.$store.getters['note/title']
      },
      set(value) {
        this.$store.dispatch('note/updateNote', { title: value })
      },
    },
    content: {
      get() {
        return this.$store.getters['note/content']
      },
      set(value) {
        this.$store.dispatch('note/updateNote', { content: value })
      },
    },
  },
}
</script>
