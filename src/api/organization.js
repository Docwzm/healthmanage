import axios from 'axios'
import './common'

const prefix = "/grouphealth_service/grouphealth";
export const downUserDataUrl = `${prefix}/user/exportUser`;
// 获取组织机构成员
export const userList = (data) => {
  return axios.post(`${prefix}/user/list`, data)
};

// 删除组织机构成员
export const deleteUser = (userId) => {
  return axios.get(`${prefix}/user/delet_user?userId=${userId}`)
};

// 根据userId获取员工信息
export const getUserInfoById = (userId) => {
  return axios.get(`${prefix}/user/editor_user?userId=${userId}`)
};

// 保存员工信息
export const saveUser = (data) => {
  return axios.post(`${prefix}/user/save_user`, data);
};

// 新增用户-短信邀请-发送
export const inviteUser = (mobiles) => {
  return axios.get(`${prefix}/user/inviteUser?mobiles=${mobiles}`)
};

/**
 * 以下是组织机构的接口
 * @returns {*[]}
 */

// 组织结构首页
export const groupList = (data) => {
  return axios.post(`${prefix}/group/list`, data);
};

// 移动用户
export const moveUser2Group = (data) => {
  return axios.post(`${prefix}/group/moveUser2Group`, data);
};

// 新增组织机构
export const addGroup = (data) => {
  return axios.post(`${prefix}/group/addGroup`, data);
};

// 删除组织机构
export const groupDelete = (groupId) => {
  return axios.get(`${prefix}/group/delete?groupId=${groupId}`);
};

// 导出数据
export const exportData = (url, data) => {
  const corsHandler = axios.create({
    headers: { "Content-Type": "application/json;charset=utf-8" },
    withCredentials: true
  });
  return corsHandler.post(url, data, { responseType: 'blob' });
};


// 下载Excel模版
export const downTemplate = () => {
  const corsHandler = axios.create({
    headers: { "Content-Type": "application/json;charset=utf-8" },
    withCredentials: true
  });
  return corsHandler.get(`${prefix}/user/exportUserTemplate`, { responseType: 'blob' })
};

// 上传Excel
export const uploadExcel = (file) => {
  const corsHandler = axios.create({
    headers: { "Content-Type": "application/json;charset=utf-8" },
    withCredentials: true
  });
  return corsHandler.post(`${prefix}/user/importUser`, file);
};
