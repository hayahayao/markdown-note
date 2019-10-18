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
  beforeDestroy() {
    this.$store.dispatch('clearList', {
      type: 'notes'
    })
  },
  beforeRouteEnter(to, from, next) {
    const id = to.params.id
    const type = to.params.from ? to.params.from : to.name.split('-')[0]
    next(vm => {
      vm.$store.dispatch('clearList', {
        type: 'notes'
      })
      if (id) {
        vm.$store.dispatch('loadSpecialList', {
          type: type,
          id: id
        })
      } else {
        vm.$store.dispatch('loadList', {
          type: 'notes'
        })
      }
    })
  },
}
</script>
