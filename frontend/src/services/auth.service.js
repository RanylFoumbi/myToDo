import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:3000/api/auth'

class AuthService {
  async login(user) {
    try {
      const response = await axios.post(API_URL + '/login', {
        email: user.email,
        password: user.password
      })
      return response
    } catch (error) {
      throw error.response.data
    }
  }

  async getAllUsers() {
    return await axios.get(API_URL + '/users', { headers: authHeader() })
  }

  async register(user) {
    try {
      return await axios.post(API_URL + '/register', {
        email: user.email,
        username: user.username,
        password: user.password
      })
    } catch (error) {
      throw error.response.data
    }
  }
}

export default new AuthService()
