import request from "../../index"

const api = "roleAbout"
export function getRolePage(params){
    return request({
        url:`${api}/getRolePage`,
        method:'post',
        params
    })
}

export function postFindRolePermissionByRoleId(params){
    return request({
        url:`${api}/findRolePermissionByRoleId`,
        method:'post',
        params
    })
}

export function postFindOneRoleByRoleId(params){
    return request({
        url:`${api}/findOneRoleByRoleId`,
        method:'post',
        params
    })
}

export function deleteRolePermissionById(params){
    return request({
        url:`${api}/deleteRolePermissionById`,
        method:"post",
        params
    })
}

export function findAllRoleList(params){
    return request({
        url:`${api}/findAllRoleList`,
        method:'get',
        params
    })
}

export function fFRoleListByMatches(params){
    return request({
        url:`${api}/fFRoleListByMatches`,
        method:'get',
        params
    })
}

export function addRole(params){
    return request({
        url:`${api}/addRole`,
        method:'post',
        params
    })
}

export function getNewRoleId(params){
    return request({
        url:`${api}/getNewRoleId`,
        method:'post',
        params
    })
}

export function deleteRole(params){
    return request({
        url:`${api}/deleteRole`,
        method:'post',
        params
    })
}