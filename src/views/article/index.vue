<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div
        slot="header"
        class="clearfix"
      >
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 数据筛选表单 -->
      <el-form
        ref="form"
        size="mini"
        :model="form"
        label-width="40px"
      >
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select
            v-model="form.region"
            placeholder="请选择频道"
          >
            <el-option
              label="区域一"
              value="shanghai"
            ></el-option>
            <el-option
              label="区域二"
              value="beijing"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-col :span="11">
            <el-date-picker
              v-model="form.date1"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >根据筛选条件共查询到8888条结果：</div>
      <!-- 数据列表
      table 表格组件
      1.把需要战士的数组列表数据绑定给组件的data属性
      注意：不用v-for 遍历，表格自带遍历功能
      2.设计表格列  el-table-column width设置表格列的宽度
      label设定列的标头 prop设定要渲染的列表项数据字段 只能展示文本
      3. 表格列默认只能渲染普通文本，如果需要展示其他内容，例如按钮图片，需要
      用到自定义列模板
      -->
      <el-table
        class="list-table"
        :data="articles"
        style="width: 100%"
        size="small"
        stripe
      >
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- <img
              class="article-cover"
              :src="scope.row.cover.images[0] || './picerror.jpg'"
              alt
            />-->
            <img
              v-if="scope.row.cover.images[0]"
              class="article-cover"
              :src="scope.row.cover.images[0]"
              alt
            />
            <img
              v-else
              class="article-cover"
              src="./picLoading.gif"
              alt
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
        ></el-table-column>
        <el-table-column label="状态">
          <!-- 如果需要在自定义列模板中获取当前遍历项数据
        那么就在template上 声明 slot-scope="scope"
          -->
          <template slot-scope="scope">
            <el-tag
              :type="articleStatus[scope.row.status].type"
            >{{articleStatus[scope.row.status].text}}</el-tag>
            <!-- <el-tag
              v-if="scope.row.status === 1"
              type="warning"
            >待审核</el-tag>
            <el-tag
              v-if="scope.row.status === 2"
              type="success"
            >审核通过</el-tag>
            <el-tag
              v-if="scope.row.status === 3"
              type="danger"
            >审核失败</el-tag>
            <el-tag
              v-if="scope.row.status === 4"
              type="info"
            >已删除</el-tag>-->
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="操作"
        >
          <template>
            <el-button
              size="mini"
              type="primary"
              circle
              icon="el-icon-edit"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              circle
              icon="el-icon-delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表分页
      total设定总数据的条数 默认按照10条每页计算总页码
      pagesize:设定每页显示条数，默认10条
      -->
      <el-pagination
        layout="prev, pager, next"
        background
        :total="totalCount"
        :page-size="pageSize"
        @current-change="onCurrentChange"
      />
    </el-card>
  </div>
</template>
<script>
import { getArticle } from '@/api/article.js'
export default {
  name: 'articleIndex',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: [], // 文章数据列表
      articleStatus: [
        {
          status: 0,
          text: '草稿',
          type: 'info'
        },
        {
          status: 1,
          text: '待审核',
          type: ''
        },
        {
          status: 2,
          text: '审核通过',
          type: 'success'
        },
        {
          status: 3,
          text: '审核失败',
          type: 'warning'
        },
        {
          status: 4,
          text: '已删除',
          type: 'danger'
        }
      ],
      totalCount: 0, // 总数据条数
      pageSize: 20 // 每页条数
    }
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    loadArticle (page = 1) {
      getArticle({
        page,
        per_page: this.pageSize
      }).then(res => {
        console.log(res)
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
      })
    },
    onSubmit () {
      console.log('submit!')
    },
    onCurrentChange (page) {
      this.loadArticle(page)
    }
  }
}
</script>
<style lang="less" scoped>
  .filter-card {
    margin-bottom: 30px;
  }
  .list-table {
    margin-bottom: 20px;
  }
  .article-cover {
    width: 100px;
    background-size: cover;
  }
</style>
