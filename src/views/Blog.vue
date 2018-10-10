<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        msg: ''
      }
    }
  }
</script>
<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    margin-left: 200px;
    overflow: hidden;
    overflow-y: auto;
  }
</style>
