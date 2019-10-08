<template>
  <el-col :span="11">
    <el-input placeholder="标题" v-model="title"></el-input>
    <el-divider></el-divider>
    <el-input type="textarea" v-model="content"></el-input>
  </el-col>
</template>

<script>
export default {
  computed: {
    title: {
      get() {
        return this.$store.getters.noteTitle
      },
      set(value) {
        this.$store.dispatch('updateNote', { title: value })
      },
    },
    content: {
      get() {
        return this.$store.getters.noteContent
      },
      set(value) {
        this.$store.dispatch('updateNote', { content: value })
      },
    },
  },
}
</script>
