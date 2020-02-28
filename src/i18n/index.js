import VueI18n from 'vue-i18n';
import Vue from 'vue';
import { getSession } from './languageCookie';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: getSession(),
  messages: {
    ZH_CN: require('./lang/ZH_CN'),
    EN: require('./lang/EN')
  },
});

export default i18n
