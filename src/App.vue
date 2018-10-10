<template>
  <div id="app"  class="container">
    <left-nav></left-nav>
    <router-view></router-view>
  </div>
</template>
<script>
import LeftNav from '@/components/LeftNav';
export default {
  created(){
    this.$router.push('/blog')
  },
  components: {
      LeftNav,
  }
}
</script>
<style lang="scss" scoped>
.container{
  width: 100%;
  height: 100%;
  display: flex;
}
</style>



