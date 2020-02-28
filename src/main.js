import './utils'
import Vue from 'vue'
import axios from 'axios'
// import echarts from 'echarts'
// import { initSentry } from '@ls/utils';
import Antd from 'ant-design-vue/es'
import App from './App'
import router from './router'
import store from './store'
import "ant-design-vue/dist/antd.less";
import './common/stylus/reset.styl';
import i18n from './i18n';
// 这里会报vue不存在的问题

// initSentry('https://bb6b38a568624851a08fa73d8e4a1426@sentry.lifesense.com/19');

export const Bus = new Vue();


Vue.config.productionTip = false;
Vue.use(Antd)
// Vue.prototype.$echarts = echarts

// axois配置
axios.defaults.baseURL = process.env.BASE_URL;

new Vue({
  router,
  render: (h) => h(App),
  store,
  i18n
}).$mount('#app');
