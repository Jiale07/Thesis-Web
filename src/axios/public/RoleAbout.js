import request from '../index'

const api = "/public"

export function getRoleList(){
    return request({
        url:`${api}/getRoleList`,
        method:'get'
    })
}