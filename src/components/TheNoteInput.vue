<template>
  <el-col :span="11">
    <el-form>
      <el-select
        v-model="newNotebook"
        @change="handleChange"
        size="mini"
        placeholder="选择笔记本"
        filterable
        allow-create
        default-first-option
      >
        <el-option
          v-for="notebook in notebooks"
          :key="notebook.id"
          :value="notebook.id"
          :label="notebook.title"
        ></el-option>
      </el-select>
      <el-divider></el-divider>
      <el-input placeholder="标题" v-model="title"></el-input>
      <el-input type="textarea" v-model="content"></el-input>
    </el-form>
  </el-col>
</template>

<script>
export default {
  data() {
    return {
      newNotebook: []
    }
  },
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
    notebooks() {
      return this.$store.getters.notelist
    },
  },
  watch: {
    newNotebook: {
      handler(val, oldVal) {
        if (val !== '') {
          const time = Date.now()
          this.$store.dispatch('addNote', {
            id: `notebook: ${String(time)}`,
            title: val,
          })
        }
      }
    },
  },
  methods: {
    handleChange(value) {
      this.$store.dispatch('note/updateNote', { notebook: value })
    }
  },
}
</script>

<style scoped>
.el-select {
  padding-left: 0;
}
.el-form {
  height: 100%;
}
</style>
