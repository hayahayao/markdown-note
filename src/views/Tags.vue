<template>
  <el-container>
    <TheMenu />
    <BooksList type="tags" />
  </el-container>
</template>

<script>
import TheMenu from '../components/TheMenu.vue';
import BooksList from '../components/BooksList.vue'

export default {
  components: {
    TheMenu,
    BooksList,
  },
  created() {
    this.$store.dispatch('loadList', {
      type: 'tags'
    })
  },
  beforeDestroy() {
    this.$store.dispatch('clearList', {
      type: 'tags'
    })
  },
}
</script>
