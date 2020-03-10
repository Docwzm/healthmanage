import request from '@/utils/request'
const SERVICE_NAME = '/rpm_platform_service'

/**
 * 新增团队
 * @param {*} data 
 */
export function addDepart(data) {
    return request({
        url: SERVICE_NAME + '/depart/create',
        method: 'post',
        data
    })
}

/**
 * 删除团队
 * @param {*} data de
 */
export function deleteDepart(id) {
    return request({
        url: SERVICE_NAME + '/depart/delete',
        method: 'post',
        data:{
            id
        }
    })
}


/**
 * 修改团队
 * @param {*} data 
 */
export function updateDepart(data) {
    return request({
        url: SERVICE_NAME + '/depart/create',
        method: 'post',
        data
    })
}