<template>
  <el-container class="center-wrapper">
    <el-form>
      <el-form-item>
        <el-input size="medium" v-model="value" placeholder="输入笔记本名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" @click="onCancel">取消</el-button>
        <el-button size="medium" type="primary" :disabled="value === ''" @click="onSubmit">创建笔记本</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    }
  },
  methods: {
    onCancel() {
      this.$router.push({
        name: this.$route.params.from,
        params: {
          from: this.$route.fullPath.slice(1),
          id: this.$route.params.id ? this.$route.params.id : ''
        }
      })
    },
    async onSubmit() {
      await this.$store.dispatch('addItem', {
        type: 'notebooks',
        item: {
          id: String(Date.now()),
          title: this.value,
          notes: [],
        }
      })
      this.$router.push({
        name: this.$route.params.from ? this.$route.params.from : 'home',
        params: {
          from: this.$route.fullPath.slice(1),
          id: this.$route.params.id ? this.$route.params.id : ''
        }
      })
    },
  },
  beforeDestroy() {
    this.$store.dispatch('clearList', {
      type: 'notebooks'
    })
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
