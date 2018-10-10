<template>
  <div class="sl-nav-list">
    <ul class="tab-wrapper">
      <li v-for="(item,index) in navList" :key="index" :class="index==indx?'active':''" @click="liClick(index)"><span>{{item}}</span></li>
    </ul>
  </div>
</template>
<script>
  import axios from 'axios';
  import * as types from './../vuex/types.js';
  import {noteInterface,articleInterface} from './../assets/js/util.js';
  import {
    mapState
  } from 'vuex'
  export default {
    props: {
      navList: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        indx: 0
      }
    },
    computed: {
      ...mapState({
        username: state => state.username
      }),
    },
    methods: {
      liClick(index) {
        this.indx = index
        switch (this.indx) {
          case 0:
            this.$router.push({
              path: '/blog/Home'
            })
            break;
          case 1:
            this.$router.push({
              path: '/blog/Article'
            })
            axios.get('/api/article', {
              params: {
                username:this.username
              }
            }).then(response => {
              let res = response.data;
              if (res.status == 1) {
                this.$store.commit(types.GET_ARTICLE,res.resData)
              }
            })
            break;
          case 2:
            this.$router.push({
              path: '/blog/Note'
            })
            axios.get('/api/note', {
              params: {
                username:this.username
              }
            }).then(response => {
              let res = response.data;
              if (res.status == 1) {
                this.$store.commit(types.GET_NOTE,res.resData)
              }
            })
            break;
          case 3:
            this.$router.push({
              path: '/blog/Edit'
            })
            break;
          case 4:
            this.$router.push({
              path: '/blog/AboutMe'
            })
            break;
          default:
            break;
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
  .sl-nav-list {
    text-align: center;
    padding: 20px 0;
    width: 100%;

    ul {
      li {
        font-size: 14px;
        padding: 10px 0;
        cursor: pointer;

        span {
          color: #999999;
        }

        &.active {
          span {
            color: #fff;
            text-shadow: 0 0 6px rgba(53, 147, 242, .9);
          }
        }
      }
    }
  }

</style>
