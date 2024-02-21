import request from '../index'

const api = "/admin/home"

export function postAdminInfo(params){
    return request({
        url:`${api}/postAdminInfo`,
        method:'post',
        params
    })
}