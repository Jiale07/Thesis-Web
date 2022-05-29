import request from '../../index'

let api = "/teacher/account/home"

export function posTeacherBasicInformation(params){
    return request({
        url:`${api}/posTeacherBasicInformation`,
        method:'post',
        params
    })
}