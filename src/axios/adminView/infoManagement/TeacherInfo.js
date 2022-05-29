import request from "../../index"

const api = "/admin/management"

export function getTeacherInfoByPage(params){
    return request({
        url:`${api}/getTeacherPage`,
        method:'post',
        params
    })
}

export function getNewTeacherId(params){
    return request({
        url:`${api}/getNewTeacherId`,
        method:'post',
        params
    })
}

export function addTeacher(params){
    return request({
        url:`${api}/addTeacher`,
        method:'post',
        params
    })
}

export function deletedTeacher(params){
    return request({
        url:`${api}/deletedTeacherById`,
        method:'post',
        params
    })
}

export function updateTeacher(params){
    return request({
        url:`${api}/updateTeacher`,
        method:'post',
        params
    })
}



