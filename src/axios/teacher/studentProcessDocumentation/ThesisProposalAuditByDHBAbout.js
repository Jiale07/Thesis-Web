import request from '../../index'

const api = '/teacher/thesisProposalAuditByDH'

export function postThesisProposalByDepartment(params){
    return request({
        url:`${api}/postThesisProposalByDepartment`,
        method:'post',
        params
    })
}