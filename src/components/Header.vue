<template>
  <a-row class="main" type="flex" justify="space-between">
    <a-row class="top" type="flex" align="middle">
      <!-- <div :class="collapsed? 'menu-fold-wrap':'menu-unfold-wrap'">
        <a-icon class="fold" :type="collapsed? 'menu-fold':'menu-unfold'" @click="handleHide" />
      </div> -->
      <a-row class="info-wrap" type="flex" align="middle">
        <a-icon :component="svg.logoIcon"></a-icon>
        <span>罗湖医院</span>
        <span>2020-02-20 星期二 9:00</span>
      </a-row>
    </a-row>
    <a-row class="right">
      <a-col :span="10">
        <a-button @click="gotoDashboard">监控大屏</a-button>
      </a-col>
      <!-- <a-col :span="10" class="right">
        <a-popover>
          <img :src="avatar" alt="" class="avatar">
          <span>{{userName}}</span>
          <template slot="content">
            <p @click="logout" style="width:80px;cursor: pointer;text-align: center">
              {{ this.$t('login.logout') }}
            </p>
          </template>
        </a-popover>
      </a-col> -->

    </a-row>

  </a-row>

</template>

<script>
import logoIcon from "@/statics/svg/icon-logo.svg";
import { mapGetters, mapMutations } from "vuex";
import { logout } from "../api/login";
import mixin from "../common/js/mixin";

export default {
  mixins: [mixin],
  data() {
    return {
      svg: {
        logoIcon
      }
    };
  },
  components: {},
  props: {
    collapsed: {
      type: Boolean
    }
  },
  mounted() {},
  methods: {
    ...mapMutations({
      setLogin: "SET_LOGIN"
    }),
    // 侧边栏切换
    handleHide() {
      this.$emit("handleHide");
    },
    // 登出
    logout() {
      logout()
        .then(res => {
          this.setLogin(false);
          this.jumpTo("/login");
        })
        .catch(err => {
          this.showNotice(`${this.$t("systemNotice.systemCode[400]")}`);
        });
    },
    gotoDashboard() {
      this.$router.push("/dashboard");
    }
  },
  computed: {
    ...mapGetters(["menu", "userName", "avatar", "section"])
  }
};
</script>

<style scoped lang="less">
.main {
  padding: 0 24px;
  overflow: hidden;
}
.top {
  svg {
    font-size: 30px;
    width: 60px;
  }
  .fold {
    cursor: pointer;
  }
  .menu-fold-wrap {
    width: 80px;
    text-align: right;
  }
  .menu-unfold-wrap {
    width: 256px;
    text-align: right;
  }
}
</style>
