<template>
  <div class="sl-login">
    <div class="sl-cont">
      <div class="sl-text">
        <span>理想是人生的太阳。</span>
      </div>
      <div class="sl-login-popup">
        <div class="sl-popup-container">
          <div class="sl-popup-box">
            <h1>SNAIL</h1>
            <div class="signin" ref="signin" style="display:block">
              <div class="sl-line">使用手机号登录</div>
              <div class="sl-input">
                <input type="text" placeholder="请输入手机号" v-model="login.user">
                <input type="password" placeholder="请输入密码" @keyup.enter="signin" v-model="login.pass">
              </div>
              <a href="javascript:;" class="sl-a-btn" @click="signin">登录</a>
              <div class="sl-login-info">
                <span>
                  <em>忘记密码?</em>
                </span>
                <span>还没有帐号？
                  <em @click="singinBtn">立即注册</em>
                </span>
              </div>
            </div>
            <div class="register" ref="register" style="display:none">
              <div class="sl-line">使用手机号注册</div>
              <div class="sl-input">
                <input type="text" placeholder="请输入手机号" v-model="blog.username">
                <input type="text" placeholder="请输入昵称" v-model="blog.nickname">
                <input type="password" placeholder="请输入密码" @keyup.enter="register" v-model="blog.password">
              </div>
              <a href="javascript:;" class="sl-a-btn" @click="register">注册</a>
              <div class="sl-login-info">
                <span>已有帐号？
                  <em @click="registerBtn">登录</em>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sl-info-popup" v-show="isShow" transition="fade">
      <span v-text="info"></span>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import * as types from './../vuex/types.js';
  export default {
    data() {
      return {
        token: '',
        info: '',
        isShow: false,
        blog: {
          username: '',
          nickname: '',
          password: ''
        },
        login: {
          user: '',
          pass: ''
        }
      }
    },
    mounted() {
      if (this.$route.params.login == 0) {
        this.$refs.register.style.display = 'none'
        this.$refs.signin.style.display = 'block'
      } else if (this.$route.params.login == 1) {
        this.$refs.signin.style.display = 'none'
        this.$refs.register.style.display = 'block'
      }
    },
    methods: {
      popup(infoTxt) {
        this.isShow = true;
        this.info = infoTxt
        setTimeout(() => {
          this.isShow = false;
          this.info = ''
        }, 3000);
      },
      signin() {
        axios.post('/api/signin', {
          params: {
            user: this.login.user.trim(),
            pass: this.login.pass.trim()
          }
        }).then(response => {
          let res = response.data;
          if (res.status === 1) {
            this.popup(res.msg)
            if (res.token) {
              this.$store.commit(types.LOGIN, res)
              let redirect = decodeURIComponent(this.$route.query.redirect || '/blog/home');
              this.$router.push({
                path: redirect
              })
            }
          }
          if (res.status === 0) {
            this.popup(res.msg)
          }
          if (res.status === 2) {
            this.popup(res.msg)
          }
          if (res.status === -1) {
            this.popup(res.msg)
          }
          if (res.status === 3) {
            this.popup(res.msg)
          }
        })
      },
      register() {
        var nameReg = /^[1][3,4,5,7,8][0-9]{9}$/;
        var passReg = /^\d{6,18}$/;
        if (this.blog.username === '') {
          this.popup("请输入手机号");
          return;
        }
        if (!nameReg.test(this.blog.username)) {
          this.popup("请输入正确的手机号");
          return;
        }
        if (this.blog.nickname.length > 12) {
          this.popup("请输入12个字符以内的昵称");
          return;
        }
        if (!passReg.test(this.blog.password)) {
          this.popup("请输入6到18位的数字");
          return;
        }
        axios.post("/api/register", {
          params: {
            username: this.blog.username.trim(),
            nickname: this.blog.nickname.trim(),
            password: this.blog.password.trim()
          }
        }).then(response => {
          let res = response.data;
          if (res.status === 1) {
            this.popup(res.msg)
            setTimeout(() => {
              this.blog.username = ''
              this.blog.nickname = ''
              this.blog.password = ''
            }, 2000);
          }
          if (res.status === 2) {
            this.popup(res.msg)
          }
          if (res.status === -1) {
            this.popup(res.msg)
          }
          if (res.status === 0) {
            this.popup(res.msg)
          }
        })
      },
      singinBtn() {
        this.$refs.signin.style.display = 'none'
        this.$refs.register.style.display = 'block'
        this.blog.username = ''
        this.blog.nickname = ''
        this.blog.password = ''
      },
      registerBtn() {
        this.$refs.register.style.display = 'none'
        this.$refs.signin.style.display = 'block'
        this.login.user = ''
        this.login.pass = ''
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

  .sl-login {
    width: 100%;
    height: 100%;
    background: url('./../../static/img/login_bg.jpg') center no-repeat;
    position: relative;
    display: flex;

    .sl-cont {
      width: 100%;
      display: flex;
      justify-content: center;

      .sl-text {
        width: 60%;
        display: flex;
        justify-content: center;

        span {
          margin-top: 35%;
          font-size: 40px;
          color: #fff;
        }
      }

      .sl-login-popup {
        width: 40%;

        .sl-popup-container {
          margin-top: 20%;
          width: 300px;
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 10px #cccccc;
          border-radius: 4px;

          .sl-popup-box {
            padding: 10px 30px;

            h1 {
              padding: 20px 0;
              text-align: center;
              color: #fff;
              text-shadow: 0 0 6px #70b0f0;
            }

            .sl-line {
              font-size: 16px;
              color: #999;
              margin: 10px auto;
              position: relative;
              text-align: center;

              &::before {
                content: "";
                border-top: 1px solid #cccccc;
                display: block;
                position: absolute;
                width: 50px;
                top: 10px;
                left: 0;
              }

              &::after {
                content: "";
                border-top: 1px solid #cccccc;
                display: block;
                position: absolute;
                width: 50px;
                top: 10px;
                right: 0;
              }
            }

            .sl-input {
              margin-top: 20px;

              input {
                box-sizing: border-box;
                width: 100%;
                display: inline-block;
                padding: 0 10px;
                height: 36px;
                font-size: 16px;
                line-height: 1;
                color: #777;
                margin: 6px 0;
                border-radius: 4px;
                border: solid 1px #cccccc;
                background: transparent;

                &::-webkit-input-placeholder {
                  font-size: 14px;
                  color: #999999;
                }
              }
            }

            .sl-a-btn {
              display: block;
              text-align: center;
              cursor: pointer;
              font-size: 16px;
              padding: 0 15px;
              height: 36px;
              line-height: 36px;
              border-radius: 4px;
              color: #fff;
              background: #3593f2;
              margin: 6px 0;

              &:hover {
                background: #298cf0;
              }
            }

            .sl-login-info {
              overflow: hidden;

              span {
                font-size: 14px;
                color: #666666;

                em {
                  color: #3593f2;
                  cursor: pointer;
                }

                &:last-child {
                  float: right;
                }
              }
            }
          }
        }
      }
    }
  }

</style>
