import request from "../../index"

const api = "/admin/management"


export function addCollegeInfo(params){
    return request({
        url:`${api}/addCollegeInfo`,
        method:'post',
        params
    })
}

export function updateCollegeName(params){
    return request({
        url:`${api}/updateCollegeName`,
        method:'post',
        params
    })
}

export function updateCollegeId(params){
    return request({
        url:`${api}/updateCollegeId`,
        method:'post',
        params
    })
}

export function logicToDeleteCollege(params){
    return request({
        url:`${api}/deleteCollegeInfoById`,
        method:'post',
        params
    })
}

export function getOneNewCollegeId(params){
    return request({
        url:`${api}/getCollegeNewId`,
        method:'post',
        params
    })
}


export function findAllCollegeList(){
    return request({
        url:`${api}/getCollegeInfoList`,
        method:'get',
    })
}