<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 数据列表 -->
      <div>
        <!-- 把数据列表绑定给表格的data -->
        <!-- 设计表格列 -->
        <!-- 给表格列绑定要先渲染的数据字段-->
        <el-table
          class="table-list"
          :data="articles"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="title"
            label="标题"
          ></el-table-column>
          <el-table-column
            prop="total_comment_count"
            label="总评论数"
          ></el-table-column>
          <el-table-column
            prop="fans_comment_count"
            label="粉丝评论数"
          ></el-table-column>
          <el-table-column
            label="评论状态"
          >
            <template slot-scope="scope">{{scope.row.comment_status ? '正常':'关闭'}}</template>
          </el-table-column>

          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.comment_status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :disabled="scope.row.statusDisabled"
                @change="onStatusChange(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <!-- 绑定页码 -->
      <!-- 绑定每页大小 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        background
      />
    </el-card>
  </div>
</template>
<script>
import { getArticle, updataCommentStatus } from '@/api/article.js'
export default {
  name: 'CommentIndex',
  data () {
    return {
      currentPage: 1, // 当前激活的页码
      articles: [],
      totalCount: 0, // 总条数
      pageSize: 10 // 每页展示条数
    }
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
  },
  mounted () {},
  methods: {
    handleSizeChange () {
      this.loadArticles(1)
    },
    handleCurrentChange (page) {
      // 加载指定页码数据
      this.loadArticles(page)
    },
    loadArticles (page = 1) {
      this.currentPage = page// 让当前分页的页码和请求数据的页码保持一致
      getArticle({
        response_type: 'comment',
        page,
        per_page: this.pageSize
      }).then(res => {
        const { results } = res.data.data
        results.forEach(article => {
          article.statusDisabled = false
        })
        this.articles = results
        this.totalCount = res.data.data.total_count
      })
    },
    onStatusChange (article) {
      article.statusDisabled = true
      updataCommentStatus(article.id.toString(), article.comment_status).then(res => {
        article.statusDisabled = false
        this.$message({
          type: 'success',
          message: article.comment_status ? '开启成功' : '关闭成功'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .table-list {
    margin-bottom: 20px;
  }
</style>
