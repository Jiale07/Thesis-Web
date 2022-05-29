import request from "../index"

const api = "/student/accountHome"

export function postStudentInfo(params){
    return request({
        url:`${api}/postStudentInfo`,
        method:'post',
        params
    })
}