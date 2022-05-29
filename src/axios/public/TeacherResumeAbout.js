import request from "../index"

const api = "/public/teacherResume"
export function postTeacherResume(params){
    return request({
        url:`${api}/postTeacherResume`,
        method:'post',
        params
    })
}


export function postUpdateTeacherResume(params){
    return request({
        url:`${api}/postUpdateTeacherResume`,
        method:'post',
        params
    })
}
