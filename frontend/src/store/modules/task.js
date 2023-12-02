import { useToast } from 'vue-toast-notification'
import TaskService from '../../services/task.service'
import 'vue-toast-notification/dist/theme-sugar.css'
const $toast = useToast()

export const task = {
  namespaced: true,
  state: {
    allTasks: [],
    isLoadingTask: false
  },
  actions: {
    async getAllTask({ commit }) {
      commit('setLoading', true)
      try {
        const response = await TaskService.getAllTask()
        console.log({ response })
        commit('setLoading', false)
        if (response.status === 201) {
          commit('setAllTask', response.data.tasks)
        }
      } catch (error) {
        commit('setLoading', false)
        console.log({ error })
        if (error.response.status === 401) {
          $toast.warning('Votre session a expirée veuillez vous connecter à nouveau')
          localStorage.clear()
          window.location.reload()
        } else {
          $toast.error("Une erreur s'est produite veuillez actualiser la page")
        }
      }
    },
    async filterTasks({ commit }, filters) {
      try {
        const response = await TaskService.filterTasks(filters)
        console.log({ filters: response.data.tasks })
        commit('setAllTask', response.data.tasks)
      } catch (error) {
        console.log({ error })
        $toast.error("une erreur s'est produite")
      }
    }
  },
  mutations: {
    setAllTask(state, tasks) {
      state.allTasks = tasks
    },
    setLoading(state, bool) {
      state.isLoadingTask = bool
    }
  },
  getters: {
    allTasks: (state) => state.allTasks,
    isLoadingTask: (state) => state.isLoadingTask
  }
}
