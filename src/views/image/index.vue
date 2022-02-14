<template>
  <div class="image-container">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="padding-bottom:20px">
        <el-radio-group
          size="small"
          v-model="collect"
          @change="loadImages(1)"
        >
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          style="float: right"
          size="small"
          type="success"
          @click=" dialogUploadVisible = true"
        >上传素材</el-button>
      </div>
      <!-- 素材列表 -->
      <el-row :gutter="0">
        <el-col
          class="img-item"
          :lg="4"
          :xs="12"
          :sm="6"
          :md="6"
          v-for="(img, index) in images"
          :key="index"
        >
          <el-image
            style="height: 100%;width:100%"
            :src="img.url"
            fit="cover"
          ></el-image>
          <div class="image-action">
            <el-button
              class="image-btn"
              type="warning"
              size="small"
              :icon="img.is_collected ? 'el-icon-star-on': 'el-icon-star-off'"
              :loading="img.loading"
              circle
              @click="onCollect(img)"
            ></el-button>
            <el-button
              class="image-btn"
              size="small"
              type="danger"
              icon="el-icon-delete"
              :loading="img.loading"
              circle
              @click="onDelete(img)"
            ></el-button>
            <!-- <i
              :class="{
              'el-icon-star-on':,
              'el-icon-star-off':!img.is_collected
            }"
            ></i>-->
            <!-- <i class="el-icon-delete"></i> -->
          </div>
        </el-col>
      </el-row>
      <!-- /素材列表结束 -->
      <!-- 数据分页 -->
      <!-- 分页数据改变以后，页码不户变化 ，它需要单独处理高亮的页码 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        :current-page.sync="page"
        @current-change="onPageChange"
      ></el-pagination>
    </el-card>
    <!-- 上传文件弹出层 -->
    <el-dialog
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true"
    >
      <!--
      upload 组件本身支持请求提交上传操作，使用它不用自己发请求
      请求方法默认是post
      请求路径：action 必须写完整路径
      请求头：headers
      -->
      <el-upload
        :show-file-list="false"
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        multiple
        :on-success="onUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div
          class="el-upload__tip"
          slot="tip"
        >只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>
<script>
import { getImages, collectImage, deleteImage } from '@/api/image.js'
export default {
  name: 'ImageIndex',
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false, // 默认查询全部
      images: [],
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      totalCount: 0, // 总数据条数
      pageSize: 24, // 每页大小
      page: 1 // 当前页码
    }
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  created () {
    // 页面初始化加载第一页
    this.loadImages(1)
  },
  mounted () {},
  methods: {
    loadImages (page = 1) {
      // 重置高亮页码，防止数据页码不对应
      this.page = page
      getImages({
        collect: this.collect,
        page,
        per_page: this.pageSize
      }).then(res => {
        const results = res.data.data.results
        results.forEach(img => {
          //  手动的往里添加loading数据 用来控制收藏按钮的loading状态
          img.loading = false
        })
        this.images = results
        this.totalCount = res.data.data.total_count
      })
    },
    onUploadSuccess () {
      // 关闭对话框
      this.dialogUploadVisible = false
      // 更新列表
      this.loadImages(this.page) // 加载全部
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    onPageChange (page) {
      this.loadImages(page)
    },
    onCollect (img) {
      img.loading = true
      // 如果已收藏 ，取消收藏
      collectImage(img.id, !img.is_collected).then(res => {
        img.is_collected = !img.is_collected
        this.loadImages(this.page) // 加载全部
        img.loading = false
      })
      // 没有收藏，添加收藏
    },
    onDelete (img) {
      img.loading = true
      deleteImage(img.id).then(res => {
        this.loadImages(this.page) // 加载全部
        img.loading = false
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .upload-demo {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .img-item {
    height: 120px;
    width: 150px;
    position: relative;
    margin: 10px;
    .image-action {
      height: 35px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: rgba(108, 108, 108, 0.7);
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      font-size: 18px;
      color: whitesmoke;
      .image-btn{
        background: transparent;
        border: 0;
        font-size: 20px;
      }
      /deep/.el-icon-star-on {
        font-size: 24px !important;
        color: orange;
      }
    }
  }
</style>
