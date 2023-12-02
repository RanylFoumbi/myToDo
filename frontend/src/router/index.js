import { createWebHistory, createRouter } from 'vue-router'
import store from '../store/'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import DashBoard from '../views/DashBoard.vue'
import TeamPage from '../views/TeamPage.vue'
import MyTasks from '../views/MyTasks.vue'

const routes = [
  {
    path: '/:catchAll(.*)',
    component: Login
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: Login
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: DashBoard
  },
  {
    path: '/tasks',
    name: 'TaskList',
    component: MyTasks
  },
  {
    path: '/team',
    name: 'Team',
    component: TeamPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = store.getters['auth/isLoggedIn']

  if (authRequired && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
