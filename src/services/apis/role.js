import api from './index'
export const url = (action) => `/role/${action}`

export async function getRole (params) {
    const data = await api.get(url('query'), params)
    return data
}

export async function searchRole (params) {
    const data = await api.get(url('search'), params)
    return data
}

export async function showRole (id) {
    const { data } = await api.get(url(`show/${id}`))
    return data
}

export async function postRole (body) {
    const  { data }  = await api.post(url('create'), body)
    return data
}

export async function putRole (body) {
    const { data } = await api.put(url(`update/${body.id}`), body.raw)
    return data
}

export async function deleteRole (id) {
    const { data } = await api.delete(url(`delete/${id}`))
    return data
}
