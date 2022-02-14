<template>
  <el-container class="layout-container">
    <el-aside
      class="aside"
      width="auto"
    >
      <AppAside
        class="aside-menu"
        :is-collapse="isCollapse"
      />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i
            class="fold-btn"
            :class="{
              'el-icon-s-fold':!isCollapse,
              'el-icon-s-unfold':isCollapse
            }"
            @click="isCollapse = !isCollapse"
          ></i>
          <span class="header-title">黑马头条后台管理</span>
        </div>
        <el-dropdown>
          <div class="user-info">
            <img
              class="user-photo"
              :src="user.photo"
              alt
            />
            <span class="user-name">{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <!-- 组件默认不识别原生事件除非内部做了处理 -->
            <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import AppAside from './components/aside.vue'
import { getUserProfile } from '@/api/user.js'
import globalBus from '@/utils/global-bus.vue'

export default {
  name: 'LayoutIndex',
  data () {
    return {
      user: {}, // 当前登录用户信息
      isCollapse: false // 侧边菜单栏展示状态
    }
  },
  components: { AppAside },
  props: {},
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
    // 注册自定义事件 只有当事件发布以后，这个注册函数就会被执行
    globalBus.$on('update-user', data => {
      // this.user = data 对象之间赋值是引用，会导致相互影响的问题
      this.user.name = data.name
      this.user.photo = data.photo
    })
  },
  mounted () {},
  methods: {
    // 除了登录接口，其他所有接口都需要授权才能请求使用
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onLogout () {
      this.$confirm('此操作将退出登录, 是否继续?', '退出登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            showClose: true,
            type: 'success',
            message: '退出成功!'
          })
          window.localStorage.removeItem('user')
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: 'info',
            message: '用户取消操作！'
          })
        })
    }
  }
}
</script>
<style lang="less" scoped>
  .layout-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .aside {
    background-color: #d3dce6;
    .aside-menu {
      height: 100%;
    }
  }
  .header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    /deep/.fold-btn {
      font-size: 25px;
      margin-right: 10px;
    }
    .header-title {
      font-size: 24px;
      font-family: 'Microsoft YaHei';
      color: rgba(12, 12, 12, 0.8);
      font-weight: 700;
      vertical-align: text-bottom;
    }
    .user-info {
      display: flex;
      align-items: center;
      .user-photo {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
  .main {
    background-color: #e9eef3;
  }
</style>
