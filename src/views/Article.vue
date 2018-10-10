<template>
  <div class="sl-article">
    <!-- <table-list :tableList="tableList"></table-list> -->
    <list :list="articleList"></list>
  </div>
</template>
<script>
/* import TableList from '@/components/TableList'; */
import List from '@/components/List.vue';
import {
    mapState
  } from 'vuex'
export default {
  data(){
    return{
      tableList:['全部','vue','es6','css3'],
    }
  },
  computed: {
      ...mapState({
        articleList: state => state.articleList
      }),
    },
  components:{
    /* TableList, */
    List
  }
}
</script>
<style scoped lang="scss">
.sl-article{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>