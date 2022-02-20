<template>
  <div class="fans-container">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- tab栏 -->
      <el-tabs type="border-card">
        <el-tab-pane label="粉丝列表">
          <el-row :gutter="10">
            <el-col
              :xs="8"
              :sm="6"
              :md="4"
              :lg="3"
              :xl="1"
              class="fans-wrap"
              v-for="(fans, index) in fansList"
              :key="index"
            >
              <!-- 头像 -->
              <el-avatar
                class="fans-photo"
                :src="fans.photo"
              ></el-avatar>
              <!-- 昵称 -->
              <p class="fans-name">{{fans.name}}</p>
              <el-button
                size="small"
                type="primary"
              >+关注</el-button>
            </el-col>
          </el-row>
          <el-pagination
            class="pagination"
            small
            layout="prev, pager, next"
            :total="totalCount"
            :page-size="pageSize"
            @current-change="onPageChange"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像">
          <FansInfo />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import { getUserfans } from '@/api/user.js'
import FansInfo from './components/fansInfo.vue'
export default {
  name: 'FansIndex',
  data () {
    return {
      fansList: [],
      totalCount: 0,
      page: 1,
      pageSize: 20
    }
  },
  components: { FansInfo },
  props: {},
  computed: {},
  watch: {},
  created () {
    this.loadUserFans()
  },
  mounted () {
  },
  methods: {
    loadUserFans () {
      getUserfans({
        page: 1,
        per_page: this.pageSize
      }).then(res => {
        this.totalCount = res.data.data.total_count
        const { results } = res.data.data
        this.fansList = results
      })
    },
    onPageChange (page) {
      this.loadUserFans(page)
    }
  }
}
</script>
<style lang="less" scoped>
  .fans-wrap {
    width: 120px;
    height: 180px;
    border: 1px dashed #ccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .fans-name {
      font-size: 13px;
    }
    .fans-photo {
      width: 80px;
      height: 80px;
    }
  }
  .pagination {
    margin-top: 20px;
    float: right;
  }
</style>
