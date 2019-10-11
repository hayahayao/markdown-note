<template>
  <el-header style="height: 30px;">
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
      return this.$store.getters.itemList
    },
  },
  methods: {
    handleClickNewNotebook() {
      this.$router.push({
        name: 'new-notebook',
        params: {
          from: this.$route.fullPath.slice(1),
          id: this.$store.getters['note/id']
        },
      })
    },
    handleChangeNotebook(value) {
      if (value !== 'new-notebook') {
        this.$store.dispatch('note/updateNote', { notebook: value })
      } else {
        this.handleClickNewNotebook()
      }
    },
  },
  created() {
    this.$store.dispatch('loadList', 'notebook')
    if (this.$store.getters['note/notebook']) {
      this.value = this.$store.getters['note/notebook']
    }
  },
  beforeDestroy() {
    this.$store.dispatch('clearList')
  },
}
</script>
