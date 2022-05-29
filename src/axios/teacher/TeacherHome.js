import request from "../index"

const api = "/teacher/home"

export function postTeacherInfo(params){
    return request({
        url:`${api}/postTeacherInfo`,
        method:'post',
        params
    })
}