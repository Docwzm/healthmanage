<template>
  <div id="app">
    <div class=""></div>
    <a-locale-provider :locale="locale">
      <a-layout class="container">
        <a-layout-header class="container-header">
          <Header :collapsed="collapsed" @handleHide="handleHide"></Header>
        </a-layout-header>
        <!--侧边栏-->
        <a-layout>
          <a-layout-sider class="sider" width="256" :trigger="null" collapsible v-model="collapsed">
            <Sider></Sider>
          </a-layout-sider>
          <a-layout class="content ct">
            <!--面包屑头部-->
            <a-layout-header class="container-header">
              <breadcrumb-header></breadcrumb-header>
            </a-layout-header>
            
            <a-layout-content>
              <router-view></router-view>
            </a-layout-content>

            <!--底部-->
            <a-layout-footer class="footer">
              <Footer></Footer>
            </a-layout-footer>
          </a-layout>
        </a-layout>
      </a-layout>
    </a-locale-provider>
  </div>
</template>

<script>
import ZH_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import EN from "ant-design-vue/lib/locale-provider/en_US";
import Sider from "@/components/Sider";
import Header from "@/components/Header";
import BreadcrumbHeader from './BreadcrumbHeader'
import Footer from "@/components/Footer";

export default {
  data() {
    return {
      collapsed: false, // 侧边栏是否展开
      locale: localStorage.getItem("lang") === "ZH_CN" ? ZH_CN : EN
    };
  },
  methods: {
    handleHide() {
      this.collapsed = !this.collapsed;
    }
  },
  computed: {
    lang() {
      return this.$i18n.locale;
    }
  },
  watch: {
    lang(newVal) {
      newVal === "ZH_CN" ? (this.locale = ZH_CN) : (this.locale = EN);
    }
  },
  components: {
    Sider,
    Header,
    BreadcrumbHeader,
    Footer
  }
};
</script>

<style  lang="stylus" scoped>
#app {
  width: 100%;
  height: 100%;

  .container {
    min-height: 100%;
    min-width: 1370px; // 设置屏幕的最小宽度

    .sider {
      background-color: #0050B3;
    }
  }

  .content {
    background-color: rgba(240, 242, 245, 1);
    padding-bottom: 110px;
    width: calc(100% - 256px);
  }

  .ct {
    position: relative;
  }

  .container-header {
    background-color: rgba(240, 242, 245, 1);
    height: 60px;
    padding: 0;
  }

  .lay-footer {
    position: absolute;
    bottom: 0;
  }

  .footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 0;
  }
}
</style>
