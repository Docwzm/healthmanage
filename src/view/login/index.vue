<template>
  <div class="main">
    <div class="form">
      <img src="../../statics/img/logo.png" alt class="logo" />
      <a-form :form="form">
        <a-form-item :wrapper-col="{ span: 18, offset: 3 }">
          <a-input
            v-decorator="[
          'username',
          {rules: [{ required: true, message: `${$t('systemNotice.login.userName')}` }]}
        ]"
            :placeholder="$t('login.account')"
          >
            <a-icon class="input-icon" slot="prefix" type="user" />
          </a-input>
        </a-form-item>
        <!--密码-->
        <a-form-item :wrapper-col="{ span: 18, offset: 3 }">
          <a-input
            v-decorator="['password',
          {rules: [{ required: true, message: `${$t('systemNotice.login.passWord')}` }]}]"
            :placeholder="$t('login.password')"
            type="password"
          >
            <a-icon class="input-icon" slot="prefix" type="lock" />
          </a-input>
        </a-form-item>
        <!--忘记密码-->
        <!--          <a-row class="forget-password">-->
        <!--            <a-col :span="3"></a-col>-->
        <!--            <a-col :span="18">-->
        <!--              <a href="#" >忘记密码</a>-->
        <!--            </a-col>-->
        <!--          </a-row>-->

        <a-form-item :wrapper-col="{ span: 18, offset: 3 }">
          <a-button @click="handleSubmit" class="submit">{{ this.$t('login.login') }}</a-button>
        </a-form-item>
      </a-form>
    </div>
    <!--底部版权-->
    <a-row class="footer">
      <a-row>copyright © 2019 {{ this.$t('footer.name') }}</a-row>
    </a-row>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { login } from "../../api/login";
import mixin from "../../common/js/mixin";

export default {
  mixins: [mixin],
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this)
    };
  },
  methods: {
    handleSubmit(value) {
      let { username, password } = this.form.getFieldsValue();
      // 用户名密码不能为空的判断
      if (username === undefined || password === undefined) {
        this.$notification.open({
          message: this.$t('systemNotice.login.notice'),
          description: this.$t('systemNotice.login.emptyLogin'),
          duration: 1
        });
        return;
      }

      login({ username, password })
        .then(res => {
          // this.setUserInfo({
          //   userId: res.userId,
          //   userName: res.userName
          // });
          localStorage.setItem("ls_userName", res.userName);
          localStorage.setItem("ls_headImg", res.headImg);
          this.setLogin(true);
          this.jumpTo("/");
        })
        .catch(err => {
          this.showNotice(`${this.$t('systemNotice.login.emptyLogin')}`);
        });
    },
    ...mapMutations({
      setLogin: "SET_LOGIN"
    })
  }
};
</script>

<style lang="stylus" scoped>
.main {
  text-align: center;
  position: relative;
  height: 100%;
  min-height: 500px;
  background: url('../../statics/img/loginBackground.png') no-repeat;
  background-size: cover;
  $green-color = #48C597;

  .mail-login {
    text-align: left;
    margin-bottom: 10px;

    a {
      color: $green-color;
    }
  }

  .input-icon {
    color: #aab2bd;
  }

  .logo {
    display: block;
    width: 180px;
    height: 40px;
    margin: 0 auto 30px;
  }

  .form {
    width: 525px;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .forget-password {
    text-align: right;
    margin: 10px 0;

    a {
      color: $green-color;
    }
  }

  .submit {
    color: #fff;
    width: 100%;
    border: transparent;
    background: linear-gradient(134deg, rgba(102, 238, 98, 1) 0%, rgba(69, 193, 156, 1) 100%);
  }

  .footer {
    color: #fff;
    width: 100%;
    position: absolute;
    bottom: 20px;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;

    .first {
      padding-bottom: 10px;
    }
  }
}
</style>
