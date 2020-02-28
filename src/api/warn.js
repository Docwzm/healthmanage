import axios from 'axios'
import './common'

const prefix = "/grouphealth_service/grouphealth";
export const downWarnDataUrl = `${prefix}/warn/exportWarn`;

// 获取组织机构成员
export const warnList = (data) => {
  return axios.post(`${prefix}/warn/list`, data)
};

// 处理预警问题
export const warnDeal = (data) => {
  return axios.post(`${prefix}/warn/deal`, data)
};

// 获取预警配置
export const getWarnConf = () => {
  return axios.get(`${prefix}/warn/getconf`)
};

// 保存预警配置
export const saveWarnConf = (data) => {
  return axios.post(`${prefix}/warn/save`, data)
};

// 预警饼图数据
export const getWarnChartData = (healthType) => {
  return axios.get(`${prefix}/warn/homePageWarnTab?healthType=${healthType}`)
};
