import request from '@/utils/request'

/**
 * 登陆
 * @param {*} data 
 */
export function login(data){
    return request({
        url: '',
        method: 'post',
        data
    })
}

/**
 * 登出
 * @param {*} data 
 */
export function logout(data){
  return request({
      url: '',
      method: 'post',
      data
  })
}