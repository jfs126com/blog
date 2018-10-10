<template>
  <div class="sl-note">
    <!-- <table-list :tableList="tableList"></table-list> -->
    <list :list="noteList"></list>
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
        noteList: state => state.noteList
      }),
    },
  components:{
    /* TableList, */
    List
  },
  methods:{
    
  }

}
</script>
<style scoped lang="scss">
.sl-note{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>