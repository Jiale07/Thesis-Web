import request from "../index"

const api = "/public"

export function postAuditStatusCategoryList(){
    return request({
        url:`${api}/postAuditStatusCategoryList`,
        method:'post'
    })
}