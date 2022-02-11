<template>
  <el-menu
    default-active="/"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
    :collapse-transition = false
  >
    <div
      class="login-head"
      v-show="!isCollapse"
    >
      <div class="logo"></div>
    </div>
    <el-menu-item index="/">
      <i class="el-icon-s-home text-top"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-document text-top"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="el-icon-picture text-top"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="el-icon-edit text-top"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="el-icon-s-comment text-top"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="el-icon-s-opportunity text-top"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item
      class="nextOne"
      index="/settings"
    >
      <i class="el-icon-s-tools text-top"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'AppAside',
  data () {
    return {}
  },
  components: {},
  props: ['is-collapse'],
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style lang="less" scoped>
  .login-head {
    display: flex;
    justify-content: center;
    padding-top: 15px;
    margin-bottom: 20px;
    .logo {
      width: 130px;
      height: 57px;
      background: url('./logo_admin.png') no-repeat;
      background-size: contain;
    }
  }
  /deep/.text-top {
    vertical-align: text-top !important;
    &::before {
      font-size: 20px;
    }
  }
  /deep/.el-menu-item {
    font-size: 17px;
    padding:0 40px 0 20px !important;
  }
</style>
