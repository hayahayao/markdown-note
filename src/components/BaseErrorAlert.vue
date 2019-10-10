<template>
  <el-alert v-if="title !== 0" type="error" :title="title" center show-icon></el-alert>
</template>

<script>
export default {
  computed: {
    title() {
      return this.$store.getters.error
    }
  }
}
</script>
