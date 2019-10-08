<template>
  <el-main @click.native="handleClick">
    <div>Tap to add new note</div>
  </el-main>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$router.push({ name: 'new' })
    },
  },
}
</script>

<style scoped>
.el-main {
  cursor: pointer;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.el-main div {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 40px;
  color: #909399;
}
</style>
