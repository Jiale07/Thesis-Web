import request from '../../index'
const api = "/student/ThesisProposal"
const api2 = "/public"

export function getThesisProposalInputSettingList(){
    return request({
        url:`${api}/getThesisProposalInputSettingList`,
        method:'get'
    })
}

export function postStudentInfoById(params){
    return request({
        url:`${api}/postStudentInfoById`,
        method:'post',
        params
    })
}

export function postTeacherInfoOfInstructorById(params){
    return request({
        url:`${api}/postTeacherInfoOfInstructorById`,
        method:'post',
        params
    })
}

export function postSubmitThesisProposal(data){
    return request({
        url:`${api}/postSubmitThesisProposal`,
        method:'post',
        data
    })
}

export function postThesisProposalByStudentId(params){
    return request({
        url:`${api}/postThesisProposalByStudentId`,
        method:'post',
        params
    })
}

export function postTPInputListByTPId(params){
    return request({
        url:`${api}/postTPInputListByTPId`,
        method:'post',
        params
    })
}

export function postVerifyJoinGDTeam(params){
    return request({
        url:`${api}/postVerifyJoinGDTeam`,
        method:'post',
        params
    })
}

export function postFindFileInfoById(params){
    return request({
        url:`${api}/postFindFileInfoById`,
        method:'post',
        params
    })
}

export function postDeletedFileLogic(params){
    return request({
        url:`${api2}/postDeletedFileLogic`,
        method:'post',
        params
    })
}

export function postVerifyTheThesisProposalIsAudit(params){
    return request({
        url:`${api}/postVerifyTheThesisProposalIsAudit`,
        method:'post',
        params
    })
}

export function postThesisProposalAuditInputSettingList(){
    return request({
        url:`${api}/postThesisProposalAuditInputSettingList`,
        method:'post',
    })
}

export function postThesisProposalAuditInputList(params){
    return request({
        url:`${api}/postThesisProposalAuditInputList`,
        method:'post',
        params
    })
}


export function deletedThesisProposalLogic(params){
    return request({
        url:`${api}/deletedThesisProposalLogic`,
        method:'post',
        params
    })
}