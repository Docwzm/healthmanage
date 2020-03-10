import request from '@/utils/request'
const SERVICE_NAME = '/rpm_platform_service'

/**
 * 新增机构
 * @param {*} data 
 */
export function addOrg(data) {
    return request({
        url: SERVICE_NAME + '/org/create',
        method: 'post',
        data
    })
}

/**
 * 删除机构
 * @param {*} data 
 */
export function deleteOrg(id) {
    return request({
        url: SERVICE_NAME + '/org/delete',
        method: 'post',
        data:{
            id
        }
    })
}


/**
 * 修改机构
 * @param {*} data 
 */
export function updateOrg(data) {
    return request({
        url: SERVICE_NAME + '/org/create',
        method: 'post',
        data
    })
}