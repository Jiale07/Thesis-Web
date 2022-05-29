import request from '../../index'

const api = "/teacher/gdTeam/ThesisProposalSubmittedTable"

export function postThesisProposalSubmitted(params){
    return request({
        url:`${api}/postThesisProposalSubmitted`,
        method:'post',
        params
    })
}