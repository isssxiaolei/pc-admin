// 基于axios 的请求模块
import axios from 'axios'

// 创建一个axios实例，说白了就是复制了一个axios不同的axios实例可以有
// 不同的配置，并且不会冲突
// 创建的axios实例和axios本身的功能一样
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'// 请求的基础路径
})

// 请求拦截器
// 相应拦截器

// 导出请求方法
export default request
