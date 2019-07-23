// 这个文件处理与用户相关的操作
// 引入axios
import axios from '@/utils/myaxios.js'
// 登录
export const login = (data) => {
  return axios({
    url: 'login',
    method: 'post',
    data

  })
}

// 获取所有用户数据
export const getAllUserList = (params) => {
  return axios({
    url: 'users',
    params
  })
}

// 添加用户数据
export const addUser = (data) => {
  return axios({
    url: 'users',
    method: 'post',
    data
  })
}

// 编辑修改用户数据
export const editUser = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}

// 根据id删除用户数据
export const delUser = (id) => {
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}
