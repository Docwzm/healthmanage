import request from '@/utils/request'
const SERVICE_NAME = '/rpm_platform_service'

/**
 * 新增医生
 * @param {*} data 
 */
export function addDoctor(data) {
    return request({
        url: SERVICE_NAME + '/doctor/create',
        method: 'post',
        data
    })
}

/**
 * 删除医生
 * @param {*} data de
 */
export function deleteDoctor(id) {
    return request({
        url: SERVICE_NAME + '/doctor/delete',
        method: 'post',
        data: {
            id
        }
    })
}


/**
 * 修改医生
 * @param {*} data 
 */
export function updateDoctor(data) {
    return request({
        url: SERVICE_NAME + '/doctor/create',
        method: 'post',
        data
    })
}