import request from "../../index"

const api = "/admin/management"
export function getMajorListByCollege(params){
    return request({
        url:`${api}/getMajorListByCollege`,
        method:'get',
        params
    })
}

export function updateMajor(params){
    return request({
        url:`${api}/updateMajor`,
        method:'post',
        params,
    })
}

export function addMajor(params){
    return request({
        url:`${api}/addMajor`,
        method:'post',
        params,
    })
}

export function addMajorByList(params){
    return request({
        url:`${api}/addMajorByList`,
        method:'post',
        params,
    })
}

export function deleteMajor(params){
    return request({
        url:`${api}/deleteMajorById`,
        method:'post',
        params,
    })
}

export function getMajorListByPage(params){
    return request({
        url:`${api}/getMajorListByPage`,
        method:'post',
        params,
    })
}