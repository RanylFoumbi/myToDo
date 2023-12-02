import AuthService from '../../services/auth.service'
import route from '../../router/index'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
const $toast = useToast()

export const auth = {
  namespaced: true,
  state: {
    user: {
      uuid: '',
      role: '',
      email: '',
      phone: '',
      avatar: '',
      username: ''
    },
    allUsers: [],
    token: null,
    expires_in: 0,
    loggedIn: false,
    loadingLogin: false,
    loadingRegister: false,
    loadingGetUsers: false
  },
  actions: {
    async login({ commit }, user) {
      commit('setLoadingLogin', true)
      try {
        const response = await AuthService.login(user)
        console.log({ response })
        if (response.status === 201) {
          commit('setLoadingLogin', false)
          commit('setToken', response.data.token)
          commit('loginSuccess', response.data.user)
          route.replace('/dashboard')
          $toast.success('Vous êtes désormais connecté!')
        } else {
          commit('setLoadingLogin', false)
          $toast.error('Une erreur est survenue!')
        }
      } catch (error) {
        commit('setLoadingLogin', false)
        console.error('Login error:', error)
        const errorMessage = error.message
        if (errorMessage === 'WRONG_PASSWORD') {
          $toast.warning('Mot de passe incorrect')
        } else if (errorMessage === 'EMAIL_NOT_EXIST') {
          $toast.warning(`L'e-mail ${user.email} n'existe pas!`)
        } else {
          $toast.error('Erreur interne du serveur!')
        }
      }
    },
    logout({ commit }) {
      commit('logout')
      $toast.success('Vous êtes actuellement déconnecté!')
      localStorage.clear()
      route.replace('/login')
    },
    async getAllUsers({ commit }) {
      commit('setLoadingGetUsers', true)
      return await AuthService.getAllUsers().then(
        (response) => {
          if (response.status === 201) {
            commit('setLoadingGetUsers', false)
            commit('getUsersSuccess', response.data.users)
          } else {
            commit('setLoadingGetUsers', false)
            $toast.error('Une erreur est survenue!')
          }
          return Promise.resolve(response.data)
        },
        (error) => {
          commit('setLoadingGetUsers', false)
          commit('getUsersFailure')
          $toast.error('Erreur interne du serveur!')
          return Promise.reject(error)
        }
      )
    },
    async register({ commit }, user) {
      commit('setLoadingRegister', true)
      return await AuthService.register(user).then(
        (response) => {
          if (response.status === 201) {
            commit('setLoadingRegister', false)
            commit('registerSuccess')
            $toast.success('Compte crée avec succès!')
            route.replace('/login')
          } else {
            commit('setLoadingRegister', false)
            $toast.error('Une erreur est survenue!')
          }
          return Promise.resolve(response.data)
        },
        (error) => {
          commit('setLoadingRegister', false)
          commit('registerFailure')
          const errorRes = error.response
          if (errorRes.status === 409) {
            $toast.warning(`L'e-mail ${user.email} existe déjà!`)
          } else {
            $toast.error('Erreur interne du serveur!')
          }
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    setLoadingLogin(state, payload) {
      state.loadingLogin = payload
    },
    setLoadingRegister(state, payload) {
      state.loadingRegister = payload
    },
    setLoadingGetUsers(state, payload) {
      state.loadingGetUsers = payload
    },
    setToken(state, payload) {
      state.token = payload
    },
    loginSuccess(state, payload) {
      state.loggedIn = true
      state.user = payload
    },
    loginFailure(state) {
      state.loggedIn = false
      state.user = null
    },
    logout(state) {
      state.loggedIn = false
      state.user = null
    },
    registerSuccess(state) {
      state.loggedIn = false
    },
    registerFailure(state) {
      state.loggedIn = false
    },
    getUsersSuccess(state, payload) {
      state.allUsers = payload
    },
    getUsersFailure(state) {
      state.allUsers = []
    }
  },
  getters: {
    user: (state) => state.user,
    allUsers: (state) => state.allUsers,
    isLoggedIn: (state) => state.loggedIn,
    loadingLogin: (state) => state.loadingLogin,
    loadingRegister: (state) => state.loadingRegister
  }
}
