<style lang="less" scoped>
li {
  list-style: none;
}

.fleft {
  float: left;
}

.fright {
  float: right;
}

.forget_bg {
  background-color: #f4f4f2;
  height: 100%;
  font-size: 12px;
  min-width: 1190px;

  .header {
    height: 60px;
    background: linear-gradient(#fcfcfc, #f9f9f9);

    .logo {
      float: left;
      //   background: url('../../../static/header/icon-logo.svg') no-repeat 0 center / auto 30px;
      padding-left: 68px;
      font-size: 18px;
      color: #000;
      font-weight: normal;
      line-height: 60px;
      cursor: pointer;
    }

    .layout {
      width: 1190px;
      margin: 0 auto;
      position: relative;
      height: 60px;

      .code {
        float: right;
        width: 110px;
        margin-top: 18px;
        position: relative;
        cursor: pointer;

        .icon {
          border: 1px solid #a5a5a5;
          border-radius: 4px;
          line-height: 25px;
          padding-left: 30px;
          width: 110px;
          box-sizing: border-box;
          font-size: 14px;
          color: #000;
          background: #fff url("../../../assets/img/login/icon.png") no-repeat
            10px center;
        }

        .hide {
          border: 1px solid #a5a5a5;
          border-top: none;
          width: 108px;
          position: absolute;
          left: 0;
          top: 24px;
          background: #fff;
          height: 110px;
          background: #fff url("../../../assets/img/login/codeOn.png")
            no-repeat center;
        }
      }
    }
  }
}

.form {
  margin: 100px auto 0;
  width: 600px;
  height: 383px;
  background: #fff;
  box-shadow: 0 0 8px #ccc;
  border-radius: 4px;

  .progress {
    height: 100px;
    overflow: hidden;
    background: #f8f9fb;
    text-align: center;

    .steps {
      overflow: hidden;
      margin-top: 20px;

      .item {
        display: inline-block;
        width: 110px;
        height: 4px;
        background: #fff;
        margin-top: 2px;
        vertical-align: middle;
        border-radius: 2px;

        .con {
          height: 100%;
          width: 0;
          background: #20a0ff;
          transition: width 0.2s linear;
        }
      }

      .item_round {
        margin-top: 0;
        width: 10px;
        height: 10px;
        border-radius: 100%;

        .con {
          border-radius: 100%;
          transition-delay: 0.2s;
        }
      }

      .item3 {
        width: 146px;
      }
    }

    .step1 {
      .item1,
      .item2 {
        .con {
          width: 100%;
        }
      }
    }

    .step2 {
      .item3,
      .item4 {
        .con {
          width: 100%;
        }
      }
    }

    .step3 {
      .item5 {
        .con {
          width: 100%;
        }
      }
    }

    .steps_word {
      margin-top: 10px;
      font-size: 14px;

      span {
        display: inline-block;
        margin: 0 40px;
        color: #a8a49d;
      }
    }

    .steps_word1 {
      .s1 {
        color: #564e43;
      }
    }

    .steps_word2 {
      .s2 {
        color: #564e43;
      }
    }
  }

  .form_list {
    overflow: hidden;
    position: relative;
    height: 283px;
  }

  .error_tips {
    color: #ff4949;
    position: absolute;
    left: 250px;
    top: 150px;
  }

  .form_item {
    padding-top: 60px;
    position: relative;
    transition: left 0.2s linear;
    height: 223px;

    .con {
      width: 360px;
      margin: 0 auto;

      .item:after {
        display: table;
        content: "";
        clear: both;
        line-height: 0;
      }

      .item {
        margin-bottom: 20px;

        .label {
          float: left;
          width: 100px;
          text-align: right;
          line-height: 28px;
        }

        .detail {
          float: right;
          padding-left: 30px;
          width: 230px;
        }

        .input {
          width: 190px;
          padding-left: 10px;
          height: 28px;
          line-height: 28px;
          border: 1px solid #d2e0ef;
          border-radius: 2px;
        }

        .input2 {
          width: 90px;
        }

        .input_error {
          border-color: #ff4949;
        }

        .code_btn {
          margin-left: 20px;
          display: inline-block;
          width: 80px;
          height: 30px;
          line-height: 30px;
          border: none;
          border-radius: 4px;
          text-align: center;
          background: #4db3ff;
          color: #fff;
        }

        .code_btn_disable {
          background: #dddbd9;
          coloe: #fff;
        }
      }

      .item:last-child {
        margin-top: 60px;
        text-align: center;

        .cancel,
        .submit {
          display: inline-block;
          width: 118px;
          line-height: 34px;
          border: 1px solid #8f95a3;
          border-radius: 4px;
          font-size: 14px;
          margin: 0 15px;
        }

        .cancel {
          background-color: #fff;
          color: #333;
        }

        .submit {
          background-color: #4db3ff;
          color: #fff;
          border-color: #4db3ff;
        }
      }
    }
  }

  .form_item1 {
    left: -600px;
  }

  .form_item2 {
    top: -283px;
    left: -1200px;
  }

  .form_item3 {
    top: -566px;
    left: -1800px;
    text-align: center;
    color: #333;

    .s1 {
      margin: 30px 0;
      font-size: 24px;
    }

    .s2 {
      font-size: 14px;
      padding-top: 26px;

      a {
        color: #199af5;
      }
    }
  }

  .form_list1 {
    .form_item1 {
      left: 0;
    }

    .form_item2 {
      left: -600px;
    }

    .form_item3 {
      left: -1200px;
    }
  }

  .form_list2 {
    .form_item1 {
      left: 600px;
    }

    .form_item2 {
      left: 0;
    }

    .form_item3 {
      left: -600px;
    }
  }

  .form_list3 {
    .form_item2 {
      left: 600px;
    }

    .form_item3 {
      left: 0;
    }
  }
}
</style>

<template>
  <div class="forget_bg">
    <header class="header">
      <div class="layout">
        <div class="logo" @click="goLogin">
            <a-icon :component="svg.logoIcon"></a-icon>
          乐心健康管理平台
        </div>
        <div class="code" @mouseenter="loginCode=true" @mouseleave="loginCode=false">
          <div class="icon">移动端下载</div>
          <div class="hide" v-if="loginCode"></div>
        </div>
      </div>
    </header>
    <div class="form">
      <div class="progress">
        <div class="steps" :class="{step1:step1,step2:step2,step3:step3}">
          <span class="item item1">
            <div class="con"></div>
          </span>
          <span class="item item2 item_round">
            <div class="con"></div>
          </span>
          <span class="item item3">
            <div class="con"></div>
          </span>
          <span class="item item4 item_round">
            <div class="con"></div>
          </span>
          <span class="item item5">
            <div class="con"></div>
          </span>
        </div>
        <div class="steps_word" :class="{steps_word1:step1,steps_word2:step2}">
          <span class="s1">验证手机号码</span>
          <span class="s2">输入新的密码</span>
        </div>
      </div>

      <div class="form_list" :class="{form_list1:step1,form_list2:step2,form_list3:step3}">
        <div class="error_tips" v-show="error_tips_show">{{error_tips}}</div>
        <div class="form_item form_item1" v-loading.body="step1Loading">
          <ul class="con">
            <li class="item">
              <span class="label">账号</span>
              <div class="detail">
                <input type="tel" maxlength="11" class="input" placeholder="请输入11位手机号码"
                  v-model="form_data1" :class="{input_error:form_data1_error}">
              </div>
            </li>
            <li class="item">
              <span class="label">验证码</span>
              <div class="detail">
                <input type="text" class="input input2" placeholder="" v-model="form_data2"
                  :class="{input_error:form_data2_error}">
                <a href="javascript:;" class="code_btn" :class="{code_btn_disable:sendCodeDisable}"
                  @click="sendCode">{{sendCodeTips}}</a>
              </div>
            </li>
            <li class="item">
              <router-link to="/" class="cancel">取 消</router-link><a href="javascript:;"
                class="submit" @click="checkForm1Submit">确 认</a>
            </li>
          </ul>
        </div>
        <div class="form_item form_item2" v-loading.body="step2Loading">
          <ul class="con">
            <li class="item">
              <span class="label">请输入新密码</span>
              <div class="detail">
                <input type="password" class="input" placeholder="" v-model="form_data3"
                  maxlength="12" :class="{input_error:form_data3_error}">
              </div>
            </li>
            <li class="item">
              <span class="label">请验证新密码</span>
              <div class="detail">
                <input type="password" class="input" placeholder="" v-model="form_data4"
                  maxlength="12" :class="{input_error:form_data4_error}">
              </div>
            </li>
            <li class="item">
              <router-link to="/" class="cancel">取 消</router-link><a href="javascript:;"
                class="submit" @click="resetPasswordSubmit">确 认</a>
            </li>
          </ul>
        </div>
        <div class="form_item form_item3">
          <p class="s1">密码修改成功，返回首页重新登录!</p>
          <p class="s2">如果浏览器没有自动跳转，请
            <router-link to="/">点击这里</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
// import {
//   sendCodeApi,
//   checkCodeApi,
//   resetPasswordApi,
//   phoneCheckApi
// } from "../../../api/forgetPassword.js";
const { sendCodeApi, checkCodeApi, resetPasswordApi, phoneCheckApi } = {};
export default {
  data() {
    return {
      step: 1,
      step1: false,
      step2: false,
      step3: false,
      error_tips_show: false,
      form_data1: "",
      form_data2: "",
      form_data3: "",
      form_data4: "",
      error_tips: "",
      isRegister: false,
      form_data1_error: false,
      form_data2_error: false,
      form_data3_error: false,
      form_data4_error: false,
      sendCodeDisable: false,
      loginCode: false,
      sendCodeTips: "获取验证码",
      error_tips_list: [
        "请输入正确手机号",
        "请输入正确验证码",
        "账号未注册！请输入已注册账号",
        "验证码不正确",
        "请输入6-12位纯数字密码",
        "两次输入的密码不一致",
        "请重复输入6-12位纯数字密码",
        "账号未注册，请输入已注册账号"
      ],
      step1Loading: false,
      step2Loading: false,
      svg:{
          logoIcon:() => import('@/assets/svg/icon-logo.svg')
      }
    };
  },
  mounted() {
    // setTimeout(() => {
    this.step1 = true;
    // }, 10);
  },
  methods: {
    phoneFalse() {
      this.error_tips_show = true;
      this.error_tips = this.error_tips_list[0];
      this.form_data1_error = true;
    },

    phoneNoRegFalse() {
      this.error_tips_show = true;
      this.error_tips = this.error_tips_list[7];
      this.form_data1_error = true;
    },

    codeFalse(api) {
      this.error_tips_show = true;
      if (api) {
        this.error_tips = this.error_tips_list[3];
      } else {
        this.error_tips = this.error_tips_list[1];
      }
      this.form_data2_error = true;
    },
    sendCodeFalse() {
      this.sendCodeTips = "重新获取";
      this.sendCodeDisable = false;
    },
    //发送验证码
    async sendCode() {
      if (this.sendCodeDisable) {
        return false;
      } else {
        var rule = /^\d{11}$/;
        if (rule.test(this.form_data1)) {
          await phoneCheckApi({ mobile: this.form_data1 })
            .then(res => {
              if (res) {
                this.isRegister = true;
                this.form_data1_error = false;
                this.sendCodeDisable = true;
                this.error_tips_show = false;
                this.form_data2_error = false;
                this.sendCodeTips = "发送中...";
                sendCodeApi({ mobile: this.form_data1 })
                  .then(() => {
                    var i = 60;
                    var timer = null;
                    timer = setInterval(() => {
                      if (i > 0 && i <= 60) {
                        i--;
                        this.sendCodeTips = i + "秒";
                      } else {
                        sendCodeFalse(this);
                        clearInterval(timer);
                      }
                    }, 1000);
                  })
                  .catch(res => {
                    this.$notify.error({
                      title: "错误",
                      message: res.msg,
                      duration: 3000
                    });
                    sendCodeFalse(this);
                    return false;
                  });
              } else {
                this.isRegister = false;
                this.form_data2_error = false;
                phoneNoRegFalse(this);
              }
            })
            .catch(() => {});
        } else {
          phoneFalse(this);
          return false;
        }
      }
    },

    //校验验证码
    async checkCode() {
      this.step1Loading = true;
      await checkCodeApi({ mobile: this.form_data1, code: this.form_data2 })
        .then(() => {
          this.step1Loading = false;
          ++this.step;
        })
        .catch(res => {
          this.step1Loading = false;
          // this.$notify.error({title: '错误', message: res.msg, duration: 3000})
          codeFalse(this, true);
          return false;
        });
    },

    checkForm1Submit() {
      var rule = /^\d{11}$/;
      if (!rule.test(this.form_data1)) {
        phoneFalse(this);
        return false;
      }
      phoneCheckApi({ mobile: this.form_data1 })
        .then(res => {
          this.isRegister = res;
          if (this.isRegister) {
            this.form_data1_error = false;
            this.error_tips_show = false;
            if (this.form_data2 < 4) {
              codeFalse(this, false);
              return false;
            } else {
              this.form_data2_error = false;
              this.error_tips_show = false;
              if (
                !this.form_data1_error &&
                !this.form_data2_error &&
                this.isRegister
              ) {
                checkCode(this);
              }
            }
          } else {
            phoneNoRegFalse(this);
            return false;
          }
        })
        .catch(() => {});
    },

    async resetPassword() {
      this.step2Loading = true;
      await resetPasswordApi({
        mobile: this.form_data1,
        code: this.form_data2,
        password: this.form_data3
      })
        .then(() => {
          this.step2Loading = false;
          ++this.step;
        })
        .catch(res => {
          this.step2Loading = false;
          this.$notify.error({
            title: "错误",
            message: res.msg,
            duration: 3000
          });
          return false;
        });
    },

    resetPasswordSubmit() {
      var rule = /^\d{6,12}$/;
      if (!rule.test(this.form_data3)) {
        this.error_tips_show = true;
        this.form_data3_error = true;
        this.error_tips = this.error_tips_list[4];
        return false;
      } else {
        this.error_tips_show = false;
        this.form_data3_error = false;
      }

      if (!rule.test(this.form_data4)) {
        this.error_tips_show = true;
        this.form_data4_error = true;
        this.error_tips = this.error_tips_list[6];
        return false;
      } else {
        this.error_tips_show = false;
        this.form_data4_error = false;
      }

      if (this.form_data4 !== this.form_data3) {
        this.error_tips_show = true;
        this.form_data4_error = true;
        this.error_tips = this.error_tips_list[5];
        return false;
      } else {
        this.error_tips_show = false;
        this.form_data4_error = false;
      }
      if (!this.form_data3_error && !this.form_data4_error) {
        resetPassword(this);
      }
    },

    goLogin() {
      router.push({ path: "/" });
    }
  },
  watch: {
    step() {
      switch (this.step) {
        case 1:
          this.step1 = true;
          break;
        case 2:
          this.step2 = true;
          break;
        case 3:
          this.step3 = true;
          break;
      }
    }
  }
};
</script>
