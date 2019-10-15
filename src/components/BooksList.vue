<template>
  <el-main>
    <el-table
      ref="table"
      :data="books"
      highlight-current-row
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button type="danger" @click="handleDelete">删除</el-button>
      <el-button @click="handleCancel">取消选择</el-button>
    </div>
  </el-main>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      multipleSelection: [],
    }
  },
  computed: {
    books() {
      return this.$store.getters[this.type]
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.$router.push({
        name: `${this.type}-notes`,
        params: {
          from: this.$route.fullPath.slice(1),
          id: val.id,
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDelete() {
      if (this.multipleSelection.length) {
        for (const selection of this.multipleSelection) {
          this.$store.dispatch('removeItem', {
            type: 'notebooks',
            item: selection,
          })
        }
      }
    },
    handleCancel() {
      this.$refs.table.clearSelection();
    }
  },
}
</script>
