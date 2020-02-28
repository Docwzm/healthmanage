import axios from 'axios'
import './common'

// 接口前缀
const prefix = "/grouphealth_service/grouphealth";

// 登录接口
export const login = (data) => {
  return axios.post(`${prefix}/auth/login`, data)
};

// 判断用户是否登录
export const authCheck = () => {
  return axios.get(`${prefix}/auth/check`)
};

// 登出接口
export const logout = () => {
  return axios.get(`${prefix}/auth/logout`)
};
