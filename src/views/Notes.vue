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
  props: {
    id: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    }
  },
  components: {
    TheMenu,
    TheNotesList,
  },
  created() {
    if (this.id) {
      this.$store.dispatch('loadSpecialList', {
        type: this.type,
        id: this.id
      })
    } else {
      this.$store.dispatch('loadList', {
        type: 'notes'
      })
    }
  },
  beforeDestroy() {
    this.$store.dispatch('clearList', {
      type: 'notes'
    })
  }
}
</script>
