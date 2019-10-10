<template>
  <el-container class="center-wrapper">
    <el-form>
      <el-form-item>
        <el-input size="medium" v-model="value" placeholder="输入笔记本名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" @click="onCancel">取消</el-button>
        <el-button size="medium" type="primary" @click="onSubmit">创建笔记本</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
import db from '../modules/database'

export default {
  data() {
    return {
      value: '',
    }
  },
  methods: {
    onCancel() {
      this.$router.go(-1)
    },
    async onSubmit() {
      const notebook = {
        id: `${String(Date.now())}`,
        title: this.value,
        notes: [],
      }
      await db.add('notebook', notebook)
      this.$router.go(-1)
    },
  }
}
</script>

<style scoped>
/* 输入框边框 */
.el-container >>> .el-input__inner {
  border: none;
  border-bottom: 1px solid #dcdfe6;
  border-radius: 0;
  padding-left: 0;
}
</style>
