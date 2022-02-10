<template>
  <el-container class="layout-container">
    <el-aside
      class="aside"
      width="200px"
    >
      <AppAside class="aside-menu" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <i class="el-icon-s-fold"></i>
        <div>黑马头条后台管理</div>
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
export default {
  name: 'LayoutIndex',
  data () {
    return {}
  },
  components: { AppAside },
  props: {},
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style lang="less" scoped>
.layout-container{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside{
   background-color: #D3DCE6;
   .aside-menu{
     height: 100%;
   }
}
.header{
  background-color: #B3C0D1;
}
.main{
    background-color: #E9EEF3;
}
</style>
