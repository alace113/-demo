import axios from 'axios'

const http = axios.create({
  baseURL: 'localhost://',
  timeout: 1000 * 30,
  headers: {}
})

// 请求拦截
http.interceptors.request.use(config =>{
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
http.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})
