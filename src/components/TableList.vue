<template>
  <div class="sl-tableList">
    <ul class="sl-warper-ul">
      <li v-for="(item,index) in tableList" :key="index" :class="index==indx?'active':''" @click="tagClick(index,item)"><span>{{item}}</span></li>
    </ul>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
  props:{
    tableList:{
      type:Array,
      default: null
    }
  },
  data(){
    return{
      indx:0
    }
  },
  methods:{
    ...mapActions(['updateActiveLabel']),
    tagClick(index,item){
      this.indx = index
      this.$emit("btype",item)
      this.updateActiveLabel(item)
    },

  }
}
</script>
<style lang="scss" scoped>
.sl-tableList{
  box-sizing: border-box;
  padding: 6px 10px;
  border-bottom: 1px solid #e5e5e5;
  box-shadow: 0 1px 6px #e5e5e5;
  .sl-warper-ul{
    overflow: hidden;
    li{
      float: left;
      cursor: default;
      background: #e0e8f1;
      margin: 4px;
      border-radius: 4px;
      &.active{
        background: #3593f2;
        span{
          color: #fff;
        }
      }
      span{
        display: block;
        font-size: 13px;
        color: #59728f;
        padding: 4px 10px;
      }
    }
  }
}

</style>
