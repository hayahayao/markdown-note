<template>
  <el-main>
    <el-table
      ref="table"
      :data="notes"
      highlight-current-row
      row-key="id"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.created | moment('YYYY/MM/DD HH:mm') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column label="笔记本">
        <template slot-scope="scope">
          <span>{{ scope.row.notebook ? scope.row.notebook.title : '' }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button type="danger" @click="handleDelete">删除</el-button>
      <el-button @click="handleCancel">取消选择</el-button>
    </div>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      multipleSelection: [],
    }
  },
  computed: {
    notes() {
      return this.$store.getters.notes
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.$router.push({
        name: 'note',
        params: {
          from: this.$route.fullPath.slice(1),
          id: val.id,
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async handleDelete() {
      if (this.multipleSelection.length) {
        for (const selection of this.multipleSelection) {
          await this.$store.dispatch('removeItem', {
            type: 'notes',
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
