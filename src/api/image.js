// 素材请求相关
import request from '@/utils/request.js'

// 上传图片素材
export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // 一般文件上传的接口都要求把请求头中的Content-Type
    // 设置为multipart/form-data，但是我们使用axios上传文件
    // 的话不需要手动设置，只需要给data一个formdata 对象即可
    data
  })
}

// 获取素材列表
export const getImages = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    // 一般文件上传的接口都要求把请求头中的Content-Type
    // 设置为multipart/form-data，但是我们使用axios上传文件
    // 的话不需要手动设置，只需要给data一个formdata 对象即可
    params
  })
}

// 收藏/取消图片
export const collectImage = (imageId, collect) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imageId}`,
    // 一般文件上传的接口都要求把请求头中的Content-Type
    // 设置为multipart/form-data，但是我们使用axios上传文件
    // 的话不需要手动设置，只需要给data一个formdata 对象即可
    data: {
      collect
    }
  })
}

// 删除素材列表
export const deleteImage = imageId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${imageId}`
  })
}
