import request from "../../index"

const api = "/editPassword"

export function postCheckOldPassword(params){
    return request({
        url:`${api}/postCheckOldPassword`,
        method:'post',
        params
    })
}

export function postUpdatePassword(params){
    return request({
        url:`${api}/postUpdatePassword`,
        method:'post',
        params
    })
}