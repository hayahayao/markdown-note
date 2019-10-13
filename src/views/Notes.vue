<template>
  <el-container>
    <TheMenu />
    <TheNotesList />
  </el-container>
</template>

<script>
import TheMenu from '../components/TheMenu.vue';
import TheNotesList from '../components/TheNotesList.vue'

export default {
  components: {
    TheMenu,
    TheNotesList,
  },
  created() {
    this.$store.dispatch('loadList', {
      type: 'notes'
    })
  },
}
</script>
