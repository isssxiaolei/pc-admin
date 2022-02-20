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

// 发表文章
export const publishArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: { draft }, // true 或 false 是否存为草稿（true 为草稿）
    data
  })
}

// 编辑文章
export const updateArticle = (articleId, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: { draft }, // true 或 false 是否存为草稿（true 为草稿）
    data
  })
}

// 获取指定文章
export const getEditArticle = articleId => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 修改文章评论状态
export const updataCommentStatus = (articleId, allowComment) => {
  return request({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id: articleId
    },
    data: {
      allow_comment: allowComment
    }
  })
}

// 文章搜索
export const searchArticle = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/search',
    params
  })
}

// 获取文章统计数据总量
export const getTotalCount = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/statistics/articles',
    params
  })
}
