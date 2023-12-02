const state = {
  isEditTaskDialogOpen: false,
  isCreateTaskDialogOpen: false,
  isDetailTaskDialogOpen: false,
  isDeleteTaskDialogOpen: false
}

const mutations = {
  setCreateTaskDialog(state, payload) {
    state.isCreateTaskDialogOpen = payload
  },
  setEditTaskDialog(state, payload) {
    state.isEditTaskDialogOpen = payload
  },
  setDetailTaskDialog(state, payload) {
    state.isDetailTaskDialogOpen = payload
  },
  setDeleteTaskDialog(state, payload) {
    state.isDeleteTaskDialogOpen = payload
  }
}

const actions = {
  openCreateTaskDialog({ commit }) {
    commit('setCreateTaskDialog', true)
  },
  closeCreateTaskDialog({ commit }) {
    commit('setCreateTaskDialog', false)
  },
  openEditTaskDialog({ commit }) {
    commit('setEditTaskDialog', true)
  },
  closeEditTaskDialog({ commit }) {
    commit('setEditTaskDialog', false)
  },
  openDetailTaskDialog({ commit }) {
    commit('setDetailTaskDialog', true)
  },
  closeDetailTaskDialog({ commit }) {
    commit('setDetailTaskDialog', false)
  },
  openDeleteTaskDialog({ commit }) {
    commit('setDeleteTaskDialog', true)
  },
  closeDeleteTaskDialog({ commit }) {
    commit('setDeleteTaskDialog', false)
  }
}

const getters = {
  isEditTaskDialogOpen: (state) => state.isEditTaskDialogOpen,
  isCreateTaskDialogOpen: (state) => state.isCreateTaskDialogOpen,
  isDetailTaskDialogOpen: (state) => state.isDetailTaskDialogOpen,
  isDeleteTaskDialogOpen: (state) => state.isDeleteTaskDialogOpen
}

export const dialog = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
