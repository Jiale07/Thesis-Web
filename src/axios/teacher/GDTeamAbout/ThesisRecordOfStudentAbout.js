import request from "../../index"

const api = "/public/gdTeam/thesisRecordOfStudent"

export function postThesisSubmittedRecordList(params){
    return request({
        url:`${api}/postThesisSubmittedRecordList`,
        method:'post',
        params
    })
}