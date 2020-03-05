import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue/es'
import "ant-design-vue/dist/antd.less";
import '@/assets/styles/reset';
import i18n from './i18n';

// import { initSentry } from '@ls/utils';
// initSentry('https://bb6b38a568624851a08fa73d8e4a1426@sentry.lifesense.com/19');

export const Bus = new Vue();

Vue.config.productionTip = false;
Vue.use(Antd)

new Vue({
  router,
  render: (h) => h(App),
  store,
  i18n
}).$mount('#app');
