// 用户相关请求
import request from '@/utils/request.js'

// 用户录
export const userLogin = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data: data // post请求体
  })
}
// 获取用户信息
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
  })
}

// 修改用户头像
//  注意：data 必须传递fromdata对象
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}

// 修改用户信息
//  注意：data 必须传递fromdata对象
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}

// 获取粉丝列表
export const getUserfans = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/followers',
    params
  })
}
