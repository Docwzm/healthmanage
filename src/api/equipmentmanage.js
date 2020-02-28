import axios from 'axios'
import './common'

const prefix = "/grouphealth_service/grouphealth";

// 设备列表
export const deviceList = (data) => {
  return axios.post(`${prefix}/device/list`, data)
};

// 添加设备
export const addDevice = (data) => {
  return axios.get(`${prefix}/device/addDevice?sns=${data}`)
};
