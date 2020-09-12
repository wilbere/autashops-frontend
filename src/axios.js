// axios
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`

// const baseURL = "http://127.0.0.1:8000/api/"
const baseURL = "http://api.autanashops.com/api/"

export default axios.create({
  baseURL: baseURL
  // You can add your headers here
})
