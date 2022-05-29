import request from '../../index'

const api = "/admin"

export function getACList(){
    return request({
        url:`${api}/getACList`,
        method:'get'
    })
}