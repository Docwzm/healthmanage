export const getSession = () => {
  let lang = navigator.language || navigator.userLanguage;
  let browserLang = lang.substr(0, 2) === 'zh' ? 'ZH_CN' : 'EN';
  return localStorage.getItem('lang') ? localStorage.getItem('lang') : browserLang
};
