import axios from 'axios'
import router from '../router'
import store from '../store'

axios.interceptors.request.use((config) => {
  config.withCredentials = true;
  if (config.params === undefined) {
    config.params = {};
  }
  config.headers['Content-Type'] = 'application/json;charset=UTF-8';
  return config
}, (error) => {
  return Promise.reject(error);
});

// eslint-disable-next-line consistent-return
axios.interceptors.response.use((response) => {
  if (response.status === 200) {
    if (response.data.code === 200) {
      return response.data.data;
    } else if (response.data.code === 401) {
      // 客户端未登录
      store.commit('SET_LOGIN', false);
      router.push('/login');
      return true
    } else {
      return Promise.reject(response.data.msg)
    }
  } else {
    return Promise.reject(response.statusText)
  }
}, (error) => {
  // 对响应错误做点什么
  return Promise.reject(error);
});
