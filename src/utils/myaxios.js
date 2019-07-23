// 这个文件封装axios相关
import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 为axios添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let token = localStorage.getItem('itcast_heimatoutiao')
  //   console.log(config)
  // 通过config获取请求头,从而添加token键值
  config.headers.Authorization = token
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default axios
