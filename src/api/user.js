import request from '@/utils/request'
const SERVICE_NAME = '/rpmaccount_service'

/**
 * 登陆
 * @param {*} data 
 */
export function login(data) {
    return request({
        url: SERVICE_NAME + '/common/login',
        method: 'post',
        data
    })
}

/**
 * 登出
 * @param {*} data 
 */
export function logout(data) {
    return request({
        url: SERVICE_NAME + '/common/logout'
    })
}