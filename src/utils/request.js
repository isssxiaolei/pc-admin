// 基于axios 的请求模块
import axios from 'axios'
import JSONBig from 'json-bigint'
import router from '@/router/'
import { Message } from 'element-ui'
// 创建一个axios实例，说白了就是复制了一个axios不同的axios实例可以有
// 不同的配置，并且不会冲突
// 创建的axios实例和axios本身的功能一样
const request = axios.create({
  baseURL: 'https://api-toutiao-web.itheima.net', // 请求的基础路径
  // 可以用来定制后端返回的原始数据的处理
  // data参数就是后端返回的原始数据
  // axios 默认在内部使用 JSON.parse 来转换处理原始数据
  transformResponse: [function (data) {
    try {
      // JSONBig 后端返回的数据可能不是JSON格式字符串
      // 如果不是的话那么 JSONBig调用就会报错
      // 所以我们使用tycatch来捕获异常，处理异常的发生
      return JSONBig.parse(data)
    } catch (error) {
      // 如果转换失败，则把原始数据原封不动的返回出去
      return data
    }
  }]
})

// 请求拦截器所有请求都会经过这里
// 我们可以在允许请求出去之前定制同意业务功能处理  例如统一的设置token
request.interceptors.request.use(
  // config 是当前请求相关的配置信息对象
  function (config) {
    // 获取存储到本地的user数据比如token
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      // 后端要求把需要授权的用户身份放到请求头中 axios可以通过 headers 选项设置请求头
      // 属性名：Authorization 属性值：Bearer token数据
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // 当return config之后请求才会真正的发出去
    return config
  },
  function (error) {
    // 请求失败进入这里
    return Promise.reject(error)
  }
)
// 响应拦截器
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  const { status } = error.response
  if (status === 401) {
    window.localStorage.removeItem('user')
    router.push('/login')
    Message.warning('登录状态无效，请重新登录')
  } else if (status === 403) {
    Message.warning('没有操作权限')
  } else if (status >= 500) {
    Message.error('服务器异常，请重试！')
  }
  return Promise.reject(error)
})
// 默认导出
export default request
