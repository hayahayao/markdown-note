<template>
  <el-header style="height: 30px;">
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
  </el-header>
</template>

<script>
export default {
  data() {
    return {
      newNotebook: []
    }
  },
  computed: {
    notebooks() {
      return this.$store.getters.notelist
    },
  },
  watch: {
    newNotebook: {
      handler(val) {
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
