import request from "../../index"

const api = "/admin/management"
export function getStudentInfo(params){
    return request({
        url:`${api}/getStudentInfo`,
        method:'get',
        params
    })
}

export function addStudent(params){
    return request({
        url:`${api}/addStudent`,
        method:'post',
        params
    })
}

export function getNewStudentId(params){
    return request({
        url:`${api}/getNewStudentId`,
        method:'get',
        params
    })
}


export function deletedStudent(params){
    return request({
        url:`${api}/deletedStudentById`,
        method:'post',
        params
    })
}


export function updateStudent(params){
    return request({
        url:`${api}/updateStudent`,
        method:'post',
        params
    })
}

export function getDefaultRoleList(params){
    return request({
        url:`public/getDefaultRoleList`,
        method:'post',
        params
    })
}