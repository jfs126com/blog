<template>
  <div class="left-nav">
    <div class="sl-cont">
      <div class="sl-nav-header">
        <div class="sl-picture">
          <img src="./../assets/images/pic_head.png" alt="">
        </div>
        <div class="sl-name">
          <span v-if="userNike">{{userNike}}</span>
          <span v-else>游客</span>
        </div>
        <div class="sl-logout" v-if="userNike" @click="logout">退出登录</div>
        <div class="sl-nav-login" v-else>
          <router-link tag="span" :to="{name:'Login',params:{login:0}}">登录</router-link> /
          <router-link tag="span" :to="{name:'Login',params:{login:1}}">注册</router-link>
        </div>
        
      </div>
      <sl-nav :navList="navList"></sl-nav>
    </div>
    <div class="footer" v-text="copyright"></div>
  </div>
</template>
<script>
  import SlNav from '@/components/SlNav';
  import * as types from './../vuex/types.js';
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        copyright: '©2018 snail',
        navList: ['首页', '文章', '笔记', '编辑', '关于我'],
      }
    },
    components: {
      SlNav
    },
    computed:{
      ...mapState({
        userNike:state => state.userNike
      }),
    },
    methods: {
      logout() {
        this.$store.commit(types.LOGOUT)
        this.$router.push({
          path: '/blog'
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .left-nav {
    width: 200px;
    height: 100%;
    background: #333;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 0;

    .sl-cont {
      width: 100%;
      margin-top: 20px;

      .sl-nav-header {
        text-align: center;

        .sl-picture {
          img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
          }
        }

        .sl-name {
          padding: 10px 0;

          span {
            color: #dbdbdb;
            font-size: 15px;
          }
        }
        .sl-logout{
            color: #dbdbdb;
            font-size: 14px;
            cursor: pointer;
        }
        .sl-nav-login {
          color: #dbdbdb;

          span {
            color: #dbdbdb;
            font-size: 15px;
            cursor: pointer;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }

    .footer {
      position: absolute;
      bottom: 10px;
      font-size: 12px;
      color: #b6b6b6;
    }
  }

</style>
