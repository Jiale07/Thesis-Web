import request from "../../index"

const api = "/admin/tutor"
// const rapi = "roleAbout"

export function getTeacherInfoByPage(params){
    return request({
        url:`${api}/getTeacherPage`,
        method:'post',
        params
    })
}

export function postBatchJoinTutor(data){
    return request({
        url:`${api}/postBatchJoinTutor`,
        method:'post',
        data,
    })
}

export function fFRoleListByMatches(params){
    return request({
        url:`${api}/fFRoleListByMatches`,
        method:'POST',
        params
    })
}


export function postTutorsPage(params){
    return request({
        url:`${api}/postTutorsPage`,
        method:'post',
        params
    })
}

export function postNotTutorPage(params){
    return request({
        url:`${api}/postNotTutorPage`,
        method:'post',
        params
    })
}

export function postQuitTutor(params){
    return request({
        url:`${api}/postQuitTutor`,
        method:'post',
        params
    })
}

export function postJoinTutor(params){
    return request({
        url:`${api}/postJoinTutor`,
        method:'post',
        params
    })
}