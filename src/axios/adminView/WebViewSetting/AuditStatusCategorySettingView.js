import request from "../../index"

const api = '/admin/webViewSetting/auditStatusCategory'

export function getAuditStatusCategoryList(){
    return request({
        url:`${api}/getAuditStatusCategoryList`,
        method:'get',
    })
}

export function postAddAuditStatusCategory(params){
    return request({
        url:`${api}/postAddAuditStatusCategory`,
        method:'post',
        params
    })
}

export function postUpdateAuditStatusCategory(params){
    return request({
        url:`${api}/postUpdateAuditStatusCategory`,
        method:'post',
        params
    })
}

export function postDeletedAuditStatusCategory(params){
    return request({
        url:`${api}/postDeletedAuditStatusCategory`,
        method:'post',
        params
    })
}