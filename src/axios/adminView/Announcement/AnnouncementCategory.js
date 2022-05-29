import request from '../../index'

const api = "/admin"

export function postFindACPage(params){
    return request({
        url:`${api}/postFindACPage`,
        method:'post',
        params
    })
}

export function postAddAC(params){
    return request({
        url:`${api}/postAddAC`,
        method:'post',
        params
    })
}

export function postUpdateAC(params){
    return request({
        url:`${api}/postUpdateAC`,
        method:'post',
        params
    })
}

export function postDeletedACLogic(params){
    return request({
        url:`${api}/postDeletedACLogic`,
        method:'post',
        params
    })
}
