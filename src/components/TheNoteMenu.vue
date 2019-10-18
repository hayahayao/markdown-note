<template>
  <el-header style="height: 30px; margin-top: 20px;">
    <span>
      <el-select
        v-model="notebookValue"
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
    </span>
    <span>
      <el-select
        v-model="tagValue"
        @change="handleAddTag"
        size="mini"
        placeholder="选择标签"
        filterable
      >
        <el-option key="new-tag" value="new-tag">
          <el-button type="text">
            <i class="el-icon-plus"></i>创建新标签
          </el-button>
        </el-option>
        <el-option v-for="tag in allTags" :key="tag.id" :value="tag.id" :label="tag.title"></el-option>
      </el-select>
      <el-tag
        v-for="tag in noteTags"
        :key="tag.id"
        closable
        @close="handleClose(tag)"
      >{{ tag.title }}</el-tag>
    </span>
    <el-button style="float: right; " type="primary" @click="handleSave">保存</el-button>
  </el-header>
</template>

<script>
export default {
  data() {
    return {
      notebookValue: '',
      tagValue: '',
    }
  },
  computed: {
    notebooks() {
      return this.$store.getters.notebooks
    },
    noteTags() {
      return this.$store.getters['note/tags']
    },
    allTags() {
      return this.$store.getters.tags
    }
  },
  methods: {
    handleChangeNotebook(notebookValue) {
      if (notebookValue === 'new-notebook') {
        this.$router.push({
          name: 'new-notebook',
          params: {
            from: this.$route.fullPath.slice(1),
            id: this.$store.getters['note/id']
          },
        })
      } else {
        const currentNotebook = this.notebooks.find(item => item.id === notebookValue)
        this.$store.dispatch('note/updateNote', {
          notebook: {
            id: currentNotebook.id,
            title: currentNotebook.title
          }
        })
      }
    },
    handleAddTag(tagValue) {
      if (tagValue === 'new-tag') {
        this.$router.push({
          name: 'new-tag',
          params: {
            from: this.$route.fullPath.slice(1),
            id: this.$store.getters['note/id']
          },
        })
      } else {
        const currentTag = this.allTags.find(item => item.id === tagValue)
        this.$store.dispatch('note/addTag', {
          tag: {
            id: currentTag.id,
            title: currentTag.title
          }
        })
      }
    },
    handleClose(tag) {
      this.$store.dispatch('note/removeTag', {
        tag: tag
      })
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
    this.$store.dispatch('loadList', {
      type: 'tags'
    })
    if (this.$store.getters['note/notebook'] !== null) {
      this.notebookValue = this.$store.getters['note/notebook'].title
    }
  },
  beforeDestroy() {
    this.$store.dispatch('clearList', {
      type: 'notebooks'
    })
    this.$store.dispatch('clearList', {
      type: 'tags'
    })
  },
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
span + span {
  margin-left: 30px;
}
</style>
