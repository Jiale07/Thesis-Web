import request from "../../index"

const api = "numberingRuleSetting"

export function getNumberingRule(params) {
    return request({
        url: `${api}/getNumberingRule`,
        method: 'get',
        params,
    })
}

export function getNumberingRulList(params) {
    return request({
        url: `${api}/getNumberingRulList`,
        method: 'get',
        params,
    })
}

export function postNumberingRule(params) {
    return request({
        url: `${api}/postNumberingRule`,
        method: 'post',
        data: params,
    })
}

export function deletedNumberingRuleById(params) {
    return request({
        url: `${api}/deletedNumberingRuleById`,
        method: 'post',
        params,
    })
}
