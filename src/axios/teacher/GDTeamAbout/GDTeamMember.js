import request from '../../index'

const api = "/teacher/gdTeam"

export function postTeamMemberByTeacherId(params){
    return request({
        url:`${api}/postTeamMemberByTeacherId`,
        method:'post',
        params
    })
}