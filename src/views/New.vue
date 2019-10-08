<template>
  <el-main>
    <el-row type="flex" justify="space-between">
      <TheNoteInput />
      <TheNoteDisplay />
    </el-row>
  </el-main>
</template>

<script>
import TheNoteInput from '../components/TheNoteInput.vue'
import TheNoteDisplay from '../components/TheNoteDisplay.vue'

export default {
  components: {
    TheNoteInput,
    TheNoteDisplay,
  },
  created() {
    this.$store.dispatch('createNote')
  },
}
</script>
