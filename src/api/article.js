/* 文章相关请求模块 */
import request from '@/utils/request.js'

// 获取文章列表
export const getArticle = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
    // body参数使用data设置
    // query参数使用params设置
    // headers参数使用headers设置
  })
}

// 获取频道列表
export const getChannels = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels',
    params
  })
}

// 删除文章
export const deleteArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
    // 接口文档中的路径参数需要在url中传递
    // 凡是看到接口路径中有:xxx 的字段则需要传递路径参数
  })
}
