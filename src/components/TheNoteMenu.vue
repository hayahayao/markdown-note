<template>
  <el-header style="height: 30px;">
    <el-button style="margin-right: 20px;" type="primary" @click="handleSave">保存</el-button>
    <el-select
      v-model="value"
      @change="handleChangeNotebook"
      size="mini"
      placeholder="选择笔记本"
      filterable
    >
      <el-option key="new-notebook" value="new-notebook">
        <el-button type="text">
          <i class="el-icon-plus"></i>创建新笔记本
        </el-button>
      </el-option>
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
      value: '',
    }
  },
  computed: {
    notebooks() {
      return this.$store.getters.notebooks
    },
  },
  methods: {
    async handleChangeNotebook(value) {
      if (value === 'new-notebook') {
        this.$router.push({
          name: 'new-notebook',
          params: {
            from: this.$route.fullPath.slice(1),
            id: this.$store.getters['note/id']
          },
        })
      } else {
        const currentNotebook = this.notebooks.find(item => item.id === value)
        await this.$store.dispatch('note/updateNote', {
          notebook: {
            id: currentNotebook.id,
            title: currentNotebook.title
          }
        })
      }
    },
    async handleSave() {
      await this.$store.dispatch('note/saveNote')
      this.$router.push({ name: 'notes' })
    },
  },
  created() {
    this.$store.dispatch('loadList', {
      type: 'notebooks'
    })
    if (this.$store.getters['note/notebook'] !== null) {
      this.value = this.$store.getters['note/notebook'].title
    }
  },
  beforeDestroy() {
    this.$store.dispatch('clearList', {
      type: 'notebooks'
    })
  },
}
</script>
