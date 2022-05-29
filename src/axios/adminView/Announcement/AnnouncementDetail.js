import request from '../../index'

const api = "/admin"
export function postAVListByAnnouncementId(params){
    return request({
        url:`${api}/postAVListByAnnouncementId`,
        method:'post',
        params
    })
}

export function postUpdateAnnouncementInfo(data){
    return request({
        url:`${api}/postUpdateAnnouncementInfo`,
        method:'post',
        data
    })
}