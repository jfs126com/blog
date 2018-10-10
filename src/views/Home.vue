<template>
  <div class="sl-home">
    <!-- <table-list :tableList="tableList" @btype="typeVal"></table-list> -->
    <list :list="blogListData"></list>
  </div>
</template>
<script>
  /* import TableList from '@/components/TableList'; */
  import List from '@/components/List.vue';
  import axios from 'axios';
  import * as types from './../vuex/types.js';
  import {
    noteInterface,
    articleInterface,
    blogInterface
  } from './../assets/js/util.js';
  import {
    mapState,
    mapGetters
  } from 'vuex';
  export default {
    data() {
      return {
        tableList: ['全部', '文章', '笔记'],
        btype: '',
      }
    },
    components: {
      /* TableList, */
      List
    },
    mounted() {
      this.blogList()
    },
    computed: {
      ...mapState({
        blogListData: state => state.blogListData
      }),
      ...mapGetters(['activeLabel']),
    },
    methods: {
      blogList() {
        axios.get('/api/blogList').then(response => {
          let res = response.data;
          if (res.status == 1) {
            this.$store.commit(types.BLOG_LIST, res.resData)
          }
        })
      },
      typeVal(label) {
        
      }
    }
  }

</script>
<style lang="scss" scoped>
  .sl-home {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

</style>
