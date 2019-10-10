<template>
  <el-header style="height: 30px;">
    <el-select
      v-model="value"
      @change="handleChangeNotebook"
      size="mini"
      placeholder="选择笔记本"
      filterable
    >
      <el-option value="new-notebook">
        <el-button @click="handleClickNewNotebook" type="text">
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
    handleChangeNotebook(value) {
      this.$store.dispatch('note/updateNote', { notebook: value })
    },
    handleClickNewNotebook() {
      this.$router.push({ name: 'new-notebook' })
    }
  },
  mounted() {
    this.$store.dispatch('loadList', 'notebook')
  },
  beforeDestroy() {
    this.$store.dispatch('clearList')
  },
}
</script>
