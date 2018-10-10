<template>
  <div class="sl-edit">
    <div class="bl-edit-container">
      <section class="bl-edit-form">
        <div class="sl-edit-title">
          <h2>发布内容</h2>
        </div>
        <form action="">
          <div class="bl-form-title bl-edit-label">
            <label for="">标题:</label>
            <input type="text" placeholder="输入标题" @blur="titleChange" v-model="blogInfo.title">
            <span class="sl-info">请输入标题</span>
          </div>
          <div class="bl-form-title bl-edit-label">
            <label for="">博客分类:</label>
            <select v-model="blogInfo.tag" @blur="tagChange">
              <option>文章</option>
              <option>笔记</option>
            </select>
            <span class="sl-info">请选择分类</span>
          </div>
          <div class="bl-form-title bl-edit-label">
            <label for="">标签类型:</label>
            <input type="text" placeholder="输入标签类型" @blur="typeChange" v-model="blogInfo.btype">
            <span class="sl-info">请输入如：vue，js，css，golang等分类</span>
          </div>
          <div class="bl-texteditor" style="height:540px">
            <div class="indexContainer">
              <div class="editorContainer">
                <mark-down ref="MarkDown" :mdValuesP="msg.mdValue" :fullPageStatusP="false" :editStatusP="true" :previewStatusP="true" :navStatusP="true"
                  :icoStatusP="true" @childevent="childEventHandler"></mark-down>
              </div>
            </div>
          </div>
          <div class="bl-edit-btn">
            <span class="sl-btn" @click="getHtmlValueFn">提交</span>
          </div>
        </form>
      </section>
    </div>
    <div class="sl-info-popup" v-show="isShow" transition="fade">
      <span v-text="info"></span>
    </div>
  </div>
</template>
<script>
  import MarkDown from "@/components/MarkDown";
  import {mapState} from 'vuex'
  import axios from 'axios';
  export default {
    data() {
      return {
        info: '',
        isShow: false,
        msg:{
          mdValue: ""
        },
        blogInfo: {
          title: "",
          tag: "",
          btype: "",
          blogDoc: "",
        },
        fileImg: {
          name: "",
          age: "",
          file: ""
        }
      }
    },
    components: {
      MarkDown
    },
    computed:{
      ...mapState({
        username:state => state.username
      }),
    },
    methods: {
      numberStr(username){
        let str = username.substring(7,)
        let t = +new Date()
        return parseInt(str + t)
      },
      popup(infoTxt){
        this.isShow = true;
          this.info = infoTxt
          setTimeout(() => {
            this.isShow = false;
            this.info = ''
        }, 3000);
      },
      titleChange() {
        if (this.blogInfo.title === '') {
          this.popup("标题不能为空")
        }
      },
      tagChange() {
        if (this.blogInfo.tag === '') {
          this.popup("分类不能为空")
        }
      },
      typeChange() {
        if (this.blogInfo.btype === '') {
          this.popup("类型不能为空")
        }
      },
      blClose() {
        this.$store.commit("blClose");
      },

      childEventHandler: function (res) {
        // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
        this.msg = res
      },
      getMdValueFn: function () {
        this.msgShow = this.msg.mdValue;
        //this.dilogStatus = true;
      },
      getHtmlValueFn: function () {
        if (this.blogInfo.title === '') {
          this.popup("标题不能为空")
          return;
        }else if (this.blogInfo.tag === '') {
          this.popup("分类不能为空")
          return;
        }else if (this.blogInfo.btype === '') {
          this.popup("类型不能为空")
          return;
        }
        this.blogInfo.blogDoc = this.msg.htmlValue;
        axios.post("/api/blogEdit",{
          params:{
            username:this.username,
            number:this.numberStr(this.username),
            title: this.blogInfo.title.trim(),
            tag: this.blogInfo.tag.trim(),
            btype: this.blogInfo.btype.trim(),
            blogDoc: this.blogInfo.blogDoc,
          }
        }).then(response=>{
          let res = response.data;
          if (res.status == 1) {
            this.popup(res.msg)
            this.blogInfo.title = ''
            this.blogInfo.tag = ''
            this.blogInfo.btype = ''
            this.mdValue = ""
            return;
          }
          if (res.status == 0) {
            this.popup(res.msg)
          }
        })
      },
      closeMaskFn: function () {
        this.msgShow = "";
        //this.dilogStatus = false;
      }
    }
  }

</script>
<style lang="scss" scoped>
  .sl-info-popup {
    position: fixed;
    top: 2%;
    left: 50%;
    transform: translateX(-50%);
    span {
      font-size: 12px;
      color: #fff;
      background: #e86e6e;
      padding: 5px 30px;
      border-radius: 4px;
    }
    &.fade-transition {
      transition: all 0.1s;
      opacity: 1;
      background: rgba(240, 20, 20, 0.5);
    }
    &.fade-enter,
    &.fade-leave {
      opacity: 0;
      background: rgba(240, 20, 20, 0);
    }
  }

  .sl-edit {
    padding: 10px;

    .sl-edit-title {
      padding: 10px 10px;
      border-bottom: 1px solid #e5e5e5;
      h2 {
        font-weight: normal;
        color: #666666;
      }

    }
    .bl-form-title {
      display: flex;
      padding: 10px 0;
      align-items: center;
      label {
        display: block;
        width: 100px;
        padding-right: 10px;
        text-align: right;
        font-size: 14px;
      }
      input {
        box-sizing: border-box;
        width: 50%;
        border: 1px solid #ccc;
        font-size: 14px;
        padding: 2px 4px;
      }
      select {
        width: 50%;
        padding: 2px 4px;
        border: 1px solid #ccc;
        font-size: 14px;
      }
    }
    .sl-info {
      font-size: 12px;
      color: #999;
      margin-left: 30px;
    }
    .error-color {
      color: #ea4747;
    }
    .bl-edit-btn {
      padding: 50px 0;
      text-align: center;
      .sl-btn {
        padding: 6px 50px;
        background: #3593f2;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        cursor: default;
        &:hover {
          background: #499df2;
        }
      }
    }
  }

  .show {
    position: absolute;
    left: 0;
    top: 0;
  }

  .indexContainer {
    width: 100%;
    height: 100%;
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .btnsContainer {
    position: absolute;
    z-index: 10;
    left: 65px;
    top: 5px;
    height: 25px;
    min-width: 300px; // background: pink;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .btn {
      display: inline-block;
      border: 1px solid #ccc;
      margin-right: 10px;
      box-sizing: border-box;
      padding: 0 10px;
      background: #fff;
      font-size: 12px;
      height: 25px;
      line-height: 25px;
      cursor: pointer;
      -moz-user-select: -moz-none;
      -moz-user-select: none;
      -o-user-select: none;
      -khtml-user-select: none;
      /* you could also put this in a class */
      -webkit-user-select: none;
      /* and add the CSS class here instead */
      -ms-user-select: none;
      user-select: none;
      /**禁止选中文字*/
      &:active {
        opacity: 0.8;
        background: lightblue;
      }
    }
  }

  .maskContainer {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.5); // z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    .contentContainer {
      width: 60%;
      height: 60%;
      background: #fefefe;
      padding: 20px;
      box-sizing: border-box;
      position: relative;
      .showAreaContainer {
        height: 100%;
        width: 100%;
        outline: none;
        background: #eee;
        display: block;
        resize: none;
        padding: 10px;
        box-sizing: border-box;
      }
      .closeBtnContainer {
        position: absolute;
        height: 30px;
        width: 30px;
        right: -40px;
        top: -40px;
        border: 1px solid #fff;
        border-radius: 50%;
        &::before {
          content: "";
          position: absolute;
          width: 70%;
          height: 2px;
          display: bblock;
          background: #fff;
          left: 15%;
          top: calc(50% - 1px);
          transform: rotate(45deg);
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
        }
        &::after {
          content: "";
          position: absolute;
          width: 70%;
          height: 2px;
          display: bblock;
          background: #fff;
          left: 15%;
          top: calc(50% - 1px);
          transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
        }
      }
    }
  }

  .editorContainer {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
  }

</style>
