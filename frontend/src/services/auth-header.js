import store from '../store'

export default function authHeader() {
  let auth = store.state.auth
  if (auth.token && auth.user) {
    return { Authorization: 'Bearer ' + auth.token }
  } else {
    return {}
  }
}
