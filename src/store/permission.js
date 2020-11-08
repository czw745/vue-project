import {
    getPermission,
} from '../services/apis/permission'

export const state = () => ({
    permissions: [],
})

export const getters = {
    permissionListGet: state => state.permissions
}

export const actions = {
    async permissionListAct({commit}, params) {
        const data = await getPermission(params)
        commit('permissionListMut', data)
        return data
    }
}

export const mutations = {
    permissionListMut(state, payload) {
        state.permissions = payload
    }
}
