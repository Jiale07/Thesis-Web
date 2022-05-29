import request from "../../index"

const api = "/teacher/gdTeam/ThesisFinalSubmittedTable"

export function postGDTeamMemberThesisFinalList(params){
    return request({
        url:`${api}/postGDTeamMemberThesisFinalList`,
        method:'post',
        params
    })
}