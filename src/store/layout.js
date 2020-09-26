export const state = () => ({
    activeProgressBar: false,
    progressBarValue: 0,
    currentDeleteConfirmationDialog: {
        title: '', // * `刪除${title}`
        action: [],
        isOpen: false,
        loading: false
    },
    currentSaveConfirmationDialog: {
        title: '',
        action: [],
        isOpen: false,
        loading: false
    },
    activeSidebar: true,
    activeSnackbar: false,
    snackbarOptions: {
        color: 'success',
        timeout: 5000,
        text: ''
    }
})

export const getters = {
    activeProgressBarGetter: state => state.activeProgressBar,
    progressBarValueGetter: state => state.progressBarValue,
    currentDeleteConfirmationDialogGetter: state => state.currentDeleteConfirmationDialog,
    currentSaveConfirmationDialogGetter: state => state.currentSaveConfirmationDialog,
    activeSidebarGetter: state => state.activeSidebar,
    activeSnackbarGetter: state => state.activeSnackbar,
    snackbarOptionsGetter: state => state.snackbarOptions
}

export const actions = {
    addProgressBarValue ({ commit }, totalValue) {
        commit('progressBarValueSetter', totalValue)
    },
    resetProgressBarValue ({ commit }) {
        commit('progressBarValueSetter', 0)
    },
    toggleProgressBar ({ commit }, isActive) {
        commit('activeProgressBarSetter', isActive)
    },
    toggleCurrentDeleteConfirmationDialog ({ commit }, { title, action, isOpen }) {
        if (isOpen) {
            commit('currentDeleteConfirmationDialogSetter', { title, action, isOpen })
        } else {
            commit('currentDeleteConfirmationDialogSetter', { title: '', action: [], isOpen, loading: false })
        }
    },
    newSucceedSnackbar ({ dispatch }, message) {
        dispatch('newSnackbar', {
            text: message || '更新成功',
            timeout: 1000,
            color: 'success'
        })
    },
    toggleSidebar ({ commit }) {
        commit('activeSidebarSetter')
    },
    newErrorSnackbar ({ dispatch }, message) {
        dispatch('newSnackbar', {
            text: message,
            timeout: -1,
            color: 'error'
        })
    },
    closeSnackbar ({ commit }) {
        commit('activeSnackbarSetter', false)
    },
    newSnackbar ({ commit, dispatch }, options) {
        commit('activeSnackbarSetter', false)
        commit('activeSnackbarSetter', true)
        commit('snackbarOptionsSetter', options)
        if (options.timeout > -1) {
            setTimeout(function () {
                dispatch('closeSnackbar')
            }, options.timeout)
        }
    },
    toggleOverlay ({ commit, state }) {
        commit('activeSnackbarSetter', !state.activeSnackbar)
    },
    async confirmCurrentDeleteAction ({ commit, dispatch, state }) {
        commit('currentDeleteConfirmationDialogSetter', { loading: true })
        const action = state.currentDeleteConfirmationDialog.action
        const result = await dispatch(`${action[0]}/${action[1]}`, action[2], {
            root: true
        })
        dispatch('toggleCurrentDeleteConfirmationDialog', { isOpen: false })
        if (result) {
            // TODO: 跳成功
        } else {
            // TODO: 跳失敗
        }
    },
    toggleCurrentSaveConfirmationDialog ({ commit }, { title, action, isOpen }) {
        if (isOpen) {
            commit('currentSaveConfirmationDialogSetter', { title, action, isOpen })
        } else {
            commit('currentSaveConfirmationDialogSetter', { title: '', action: [], isOpen, loading: false })
        }
    },
    async confirmCurrentSaveAction ({ commit, dispatch, state }) {
        commit('currentSaveConfirmationDialogSetter', { loading: true })
        const action = state.currentSaveConfirmationDialog.action
        const result = await dispatch(`${action[0]}/${action[1]}`, action[2], {
            root: true
        })
        dispatch('toggleCurrentSaveConfirmationDialog', { isOpen: false })
        if (result) {
            // TODO: 跳成功
        } else {
            // TODO: 跳失敗
        }
    }
}

export const mutations = {
    progressBarValueSetter (state, payload) {
        state.progressBarValue = payload
    },
    activeProgressBarSetter (state, payload) {
        state.activeProgressBar = payload
    },
    currentDeleteConfirmationDialogSetter (state, payload) {
        state.currentDeleteConfirmationDialog = Object.assign(
            {},
            state.currentDeleteConfirmationDialog,
            payload
        )
    },
    activeSidebarSetter (state) {
        state.activeSidebar = !state.activeSidebar
    },
    activeOverlaySetter (state, payload) {
        state.activeOverlay = payload
    },
    currentSaveConfirmationDialogSetter (state, payload) {
        state.currentSaveConfirmationDialog = Object.assign(
            {},
            state.currentSaveConfirmationDialog,
            payload
        )
    },
    activeSnackbarSetter (state, payload) {
        state.activeSnackbar = payload
    },
    snackbarOptionsSetter (state, payload) {
        state.snackbarOptions = Object.assign({}, state.snackbarOptions, payload)
    }
}
