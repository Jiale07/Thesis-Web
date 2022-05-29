import request from '../index'

const api = "/admin/management"
export function getCollegeList(params){
    return request({
        url:`${api}/getCollegeInfoList`,
        method:'get',
        params
    })
}

export function postCollegeInfoPage(params){
    return request({
        url:`${api}/postCollegeInfoPage`,
        method:'post',
        params
    })
}

export function getMajorList(params){
    return request({
        url:`${api}/getMajorListByCollege`,
        method:'get',
        params
    })
}