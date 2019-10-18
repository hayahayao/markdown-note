<template>
  <el-container>
    <TheMenu />
    <el-container>
      <TheNoteMenu />
      <el-main>
        <el-row type="flex" justify="space-between">
          <TheNoteInput />
          <TheNoteDisplay />
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TheMenu from '../components/TheMenu.vue';
import TheNoteMenu from "../components/TheNoteMenu.vue";
import TheNoteInput from '../components/TheNoteInput.vue'
import TheNoteDisplay from '../components/TheNoteDisplay.vue'

export default {
  props: {
    id: {
      type: String,
      required: false,
    }
  },
  components: {
    TheMenu,
    TheNoteMenu,
    TheNoteInput,
    TheNoteDisplay,
  },
  created() {
    if (this.id) {
      this.$store.dispatch('note/loadNote', {
        id: this.id
      })
    } else {
      this.$store.dispatch('note/initNote')
    }
  },
  beforeDestroy() {
    this.$store.dispatch('note/clearNote')
  },
}
</script>

<style scoped>
.el-container >>> .el-container {
  flex-direction: column;
}
/* main区域高度调整 */
.el-main {
  height: calc(100% - 30px);
}

.el-main >>> .el-textarea,
.el-main >>> .el-textarea__inner {
  height: 100%;
}

/* 输入框边框 */
.el-container >>> .el-input__inner,
.el-container >>> .el-textarea__inner {
  border: none;
  padding-left: 0;
}

/* 自定义title和content显示 */
.el-main >>> .my-title,
.el-main >>> .el-input--small .el-input__inner {
  margin: 0;
  padding: 0;
  font-size: 25px;
  font-weight: bold;
  height: 30px;
  line-height: 30px;
  color: #000000;
}
.el-main >>> .my-content,
.el-main >>> .el-input--small .el-textarea__inner {
  margin: 0;
  padding: 0;
}
</style>
