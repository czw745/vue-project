import api from './index'

export const url = (action) => `/permission/${action}`

export async function getPermission(params) {
    const {data} = await api.get(url('list'), params)

    const newData = data.map((category) => {
        return Object.assign({}, category, {
            id: `p-${category.id}`,
            permissions: category.child.map(child => (Object.assign({}, child, {
                id: `p2-${child.id}`
            })))
        })
    })
    return newData
}
