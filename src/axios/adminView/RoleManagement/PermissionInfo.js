import request from "../../index"

const api = "roleAbout"

export function getPermissionByRoleId(params){
    return request({
        url:`${api}/getPermissionByRoleId`,
        method:'post',
        params
    })
}

export function getPermission(params){
    return request({
        url:`${api}/getPermission`,
        method:'post',
        params
    })
}
export function getPermissionByPage(params){
    return request({
        url:`${api}/getPermissionByPage`,
        method:'post',
        params
    })
}

export function addRolePermission(data){
    return request({
        url:`${api}/addRolePermission`,
        method:'post',
        data
    })
}


//添加新的权限
export function addPermission(params){
    return request({
        url:`${api}/addPermission`,
        method:'post',
        params
    })
}

export function updatePermission(params){
    return request({
        url:`${api}/updatePermission`,
        method:'post',
        params
    })
}

export function deletedPermission(params){
    return request({
        url:`${api}/deletedPermission`,
        method:'post',
        params
    })
}