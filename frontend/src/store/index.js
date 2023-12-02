import { createStore } from 'vuex'
import { auth } from './modules/auth'
import { task } from './modules/task'
import { dialog } from './modules/dialog'
import VuexPersister from 'vuex-persister'

const vuexPersister = new VuexPersister({})

const store = createStore({
  plugins: [vuexPersister.persist],
  modules: {
    auth,
    dialog,
    task
  }
})

export default store
