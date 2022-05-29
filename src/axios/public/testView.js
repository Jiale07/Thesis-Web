import request from '../index'

export function download(params){
    return request({
        url:'public/download',
        method:'post',
        responseType: 'blob',
        params
    })
}

export function getFileName(params){
    return request({
        url:'public/postFileNameOldByFileInfoId',
        method:'post',
        params
    })
}


