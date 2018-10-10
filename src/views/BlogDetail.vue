<template>
  <div class="sl-detail">
    <div class="sl-title-cont">
      <span class="title" v-text="this.$route.params.blogDet.title"></span>
      <ul>
        <li class="sl-tag active" v-if="this.$route.params.blogDet.tag == '笔记'" v-text="this.$route.params.blogDet.tag"></li>
        <li class="sl-tag" v-else v-text="this.$route.params.blogDet.tag"></li>
      </ul>
      <span class="back" @click="back">返回</span>
    </div>
    <div class="comment-body markdown-body" v-html="this.$route.params.blogDet.blogDoc"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        msg: ''
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      }
    }
  }

</script>
<style lang="scss">
  .sl-detail {
    display: flex;
    flex-grow: 1;
    flex-direction: column;

    .sl-title-cont {
      display: flex;
      flex-direction: row;
      flex: 0 0 59px;
      align-items: center;
      padding: 0 20px;
      justify-content: center;
      border-bottom: 1px solid #e5e5e5;

      .back {
        cursor: pointer;
        font-size: 14px;
        color: #59728f;
      }

      .title {
        font-size: 20px;
        color: #4b595f;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      ul {
        display: flex;
        flex: 1 0 auto;
        margin: 0 30px;

        .sl-tag {
          font-size: 12px;
          background: #6dadee;
          color: #fff;
          padding: 2px 10px;
          border-radius: 4px;

          &.active {
            background: #5dc94f;
          }
        }
      }
    }
    .comment-body{
      margin: 20px;
      border: 1px solid #eee;
      border-radius: 4px;
      padding: 20px;
    }
  }

  

</style>
