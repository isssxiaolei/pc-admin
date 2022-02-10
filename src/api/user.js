// 用户相关请求
import request from '@/utils/request.js'

// 用户登录
export const userLogin = data => {
  return request({
    method: 'post',
    url: '/mp/v1_0/authorizations',
    data: data // post请求体
  })
}
