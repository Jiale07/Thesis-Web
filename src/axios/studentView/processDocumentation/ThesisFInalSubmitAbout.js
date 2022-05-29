import reqeust from "../../index"

const api = "/student/thesisFinal"

export function postThesisFinalByStudentId(params){
    return reqeust({
        url:`${api}/postThesisFinalByStudentId`,
        method:'post',
        params
    })
}

export function postThesisFinalSubmit(data){
    return reqeust({
        url:`${api}/postThesisFinalSubmit`,
        method:'post',
        data
    })
}

export function postVerifyHaveSubmitted(params){
    return reqeust({
        url:`${api}/postVerifyHaveSubmitted`,
        method:'post',
        params
    })
}

export function postVerifyIsCanSubmit(params){
    return reqeust({
        url:`${api}/postVerifyIsCanSubmit`,
        method:'post',
        params
    })
}