<template>
  <el-main>
    <el-table :data="tableData" highlight-current-row @current-change="handleCurrentChange">
      <el-table-column label="日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.created | moment('YYYY/MM/DD HH:mm') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
    </el-table>
  </el-main>
</template>

<script>
export default {
  computed: {
    tableData() {
      return this.$store.getters.itemList
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
    }
  },
  beforeDestroy() {
    this.$store.dispatch('clearList')
  }
}
</script>
