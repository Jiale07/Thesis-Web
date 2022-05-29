import request from '../../index'

const api = "teacherTeam"
export function postGDTeamByTeacherId(params){
    return request({
        url:`${api}/postGDTeamByTeacherId`,
        method:'POST',
        params
    })
}