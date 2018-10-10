<template>
  <div class="sl-list">
    <div class="sl-title">
      <span>标题</span>
      <span>日期</span>
    </div>
    <div class="sl-list-cont">
      <ul class="sl-wrap">
        <li class="sl-item" v-for="(item,index) in list" :key="index">
          <router-link :to="{name:item.name,params:{number:item.number,blogDet:item}}">{{item.title}}</router-link>
          <ul>
            <li class="sl-tag  active" v-if="item.tag == '笔记'">{{item.tag}}</li>
            <li class="sl-tag" v-else>{{item.tag}}</li>
            <li class="sl-tag btype">{{item.btype}}</li>
          </ul>
          <span class="sl-time">{{item.editTime | dateFrm}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
  export default {
    props: {
      list: {
        type: Array,
        default: null
      }
    },
    data() {
      return {

      }
    },
    filters:{
      dateFrm:function (el) {  
        return moment(el).format("YYYY-MM-DD HH:mm:ss");
      }
    }
  }
</script>
<style lang="scss" scoped>
  .sl-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .sl-title {
      padding: 15px 30px;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      span {
        color: #a3b4bc;
        font-size: 13px;
        &:first-child {
          margin-left: 50px;
          flex-grow: 1;
        }
        &:last-child {
          margin-right: 50px;
          text-align: right;
        }
      }
    }
    .sl-list-cont {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      .sl-wrap {
        flex-grow: 1;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        .sl-item {
          flex: 0 0 59px;
          border-bottom: 1px solid #e5e5e5;
          display: flex;
          align-items: center;
          padding: 0 30px;
          a {
            font-size: 15px;
            color: #4b595f;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &:hover {
              color: #3593f2;
            }
          }
          ul {
            display: flex;
            flex: 1 0 auto;
            margin: 0 20px;
            .sl-tag {
              font-size: 12px;
              background: #6dadee;
              color: #fff;
              padding: 2px 10px;
              border-radius: 4px;
              margin-left: 10px;
              &.active {
                background: #5dc94f;
              }
              &.btype{
                background: #c9ced4;
              }
            }
            
          }
          .sl-time {
            font-size: 12px;
            color: #999;
            cursor: default;
            text-align: right;
          }
        }
      }
    }
  }

</style>
