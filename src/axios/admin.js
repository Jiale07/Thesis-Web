import request from "./index"

export function getStudentAccountList(params){
    return request({
        url:'/admin/getStudentAccountList',
        method:'get',
        params
    })
}
