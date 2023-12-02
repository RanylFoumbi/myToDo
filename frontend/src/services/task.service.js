import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:3000/api/task'

class TaskService {
  getAllTask() {
    return axios.get(`${API_URL}/all`, { headers: authHeader() })
  }

  filterTasks(filters) {
    return axios.post(`${API_URL}/search`, filters, { headers: authHeader() })
  }

  createTask(task) {
    return axios.post(`${API_URL}/create`, task, { headers: authHeader() })
  }

  updateTask(id, updates) {
    return axios.patch(`${API_URL}/update/${id}`, updates, { headers: authHeader() })
  }

  deleteTask(id) {
    console.info({ id })
    return axios.delete(`${API_URL}/delete/${id}`, { headers: authHeader() })
  }
}

export default new TaskService()
