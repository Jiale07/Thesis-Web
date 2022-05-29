import request from "./index"

export function login(params){
    return request({
        url:'/login/userLogin',
        method:'post',
        params
    })
}

export function updateToken(params){
    return request({
        url:'/login/updateToken',
        method:'post',
        params
    })
}