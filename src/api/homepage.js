import axios from 'axios'
import './common'

const prefix = "/grouphealth_service/grouphealth";

// 设备列表
export const homepageShow = (data) => {
  return axios.post(`${prefix}/homepage/show`, data)
};

// 通用的查看更多 此api后端取消
// export const analyseOrder = (data) => {
//   return axios.post(`${prefix}/homepage/order`, data)
// };

// 首页预警模块
export const homeWarn = () => {
  return axios.get(`${prefix}/warn/homepage_warn`)
};
