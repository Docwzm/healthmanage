/*
  健康分析
 */
import axios from 'axios'
import './common'

const prefix = "/grouphealth_service/grouphealth";
export const downHeathDataUrl = `${prefix}/analyse/exportAnalyse`;

// 获取健康分析列表数据
export const analyseList = (data) => {
  return axios.post(`${prefix}/analyse/list`, data)
};
