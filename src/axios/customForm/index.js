import request from "./../index"

const api = 'customForm'
export function postCreateFormTemplate(data) {
  return request({
    url: `${api}/postCreateFormTemplate`,
    method: 'post',
    data,
  })
}

export function postUpdateFormTemplate(data) {
  return request({
    url: `${api}/postUpdateFormTemplate`,
    method: 'post',
    data,
  })
}

export function getFormTemplateList(params) {
  return request({
    url: `${api}/selectFormTemplatePage`,
    method: 'get',
    params,
  })
}

export function getFormTemplateListByUser() {
  return request({
    url: `${api}/getFormTemplateListByUser`,
    method: 'get',
  })
}

export function getFormTemplateComplete(params) {
  return request({
    url: `${api}/selectFormTemplateComplete`,
    method: 'get',
    params,
  })
}

export function postCreateCustomForm(data) {
  return request({
    url: `${api}/createCustomForm`,
    method: 'post',
    data: JSON.stringify(data)
  })
}
export function postUpdateCustomForm(data) {
  return request({
    url: `${api}/updateCustomForm`,
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function postVerifyIsCanCreateForm(params) {
  return request({
    url: `${api}/verifyIsCanCreateForm`,
    method: 'post',
    params,
  })
}

export function getFormVOByFormTemplateId(params) {
  return request({
    url: `${api}/getFormVOByFormTemplateId`,
    method: 'get',
    params,
  })
}
