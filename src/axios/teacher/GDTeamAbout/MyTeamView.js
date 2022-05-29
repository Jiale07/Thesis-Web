import request from '../../index'

const api = "/teacher/gdTeam"
export function postGDTeamByTeacherId(params){
    return request({
        url:`${api}/postGDTeamByTeacherId`,
        method:'post',
        params
    })
}

export function postTeacherInfo(params){
    return request({
        url:`${api}/postTeacherInfo`,
        method:'post',
        params
    })
}

export function postGDTeamMemberNumber(params){
    return request({
        url:`${api}/postGDTeamMemberNumber`,
        method:'post',
        params
    })
}