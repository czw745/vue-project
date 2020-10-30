export const state = () => ({
    dialog: {},
    snackbar: {}
})

export const getters = {
    dialogGet: state => state.dialog,
    snackbarGet: state => state.snackbar,
}

export const actions = {
    async dialogAct({commit}, params) {
        commit('dialogMut', params)
    },
    async dialogConfirmAct({dispatch}, params) {
        await dispatch(`${params.store.module}/${params.store.action}`, params.store.id, {root: true})
    },
    async snackbarAct({commit}, params) {
        commit('snackbarMut', params)
    }
}

export const mutations = {
    dialogMut(state, payload) {
        state.dialog = payload
    },
    snackbarMut(state, payload) {
        state.snackbar = payload
    }
}
