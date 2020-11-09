import {
    getSelectRoles
} from '../services/apis/select'

export const state = () => ({
    selectRoles: []
})

export const getters = {
    selectRolesGet: state => state.selectRoles
}

export const actions = {
    async selectRolesAct({commit}) {
        const data = await getSelectRoles()
        commit('selectRolesMut', data)
        return data
    }
}

export const mutations = {
    selectRolesMut(state, payload) {
        state.selectRoles = payload
    }
}
