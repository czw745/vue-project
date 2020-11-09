import api from './index'

export const url = (action) => `/select/${action}`

export async function getSelectRoles() {
    const {data} = await api.get(url('roles'))
    return data
}
