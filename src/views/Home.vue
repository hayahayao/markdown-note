<template>
  <el-container>
    <TheMenu />
    <el-main class="center-wrapper" @click.native="handleClick">
      <div>Tap to add new note</div>
    </el-main>
  </el-container>
</template>

<script>
import TheMenu from '../components/TheMenu.vue';

export default {
  components: {
    TheMenu
  },
  methods: {
    handleClick() {
      this.$router.push({ name: 'new' })
    },
  },
}
</script>

<style scoped>
.el-main {
  cursor: pointer;
}
.el-main div {
  font-size: 40px;
  color: #303133;
}
</style>
