import api from './index'
export const url = (action) => `/user/${action}`

export async function getUser (params) {
    const data = await api.get(url('query'), params)
    return data
}

export async function searchUser (params) {
    const data = await api.get(url('search'), params)
    return data
}

export async function showUser (id) {
    const { data } = await api.get(url(`show/${id}`))
    return data
}

export async function postUser (body) {
    const { data } = await api.post(url('create'), body)
    return data
}

export async function putUser (body) {
    const { data } = await api.put(url(`update/${body.id}`), body.raw)
    return data
}

export async function deleteUser (id) {
    const { data } = await api.delete(url(`delete/${id}`))
    return data
}
