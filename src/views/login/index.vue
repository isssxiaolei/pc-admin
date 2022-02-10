<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <el-form
        class="login-form"
        ref="form"
        :model="user"
      >
        <el-form-item>
          <el-input
            v-model="user.mobile"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="user.code"
            placeholder="请输入验证码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            :loading="loginLoading"
            @click="onLogin"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      checked: false, // 是否同意协议
      loginLoading: false // 登录按钮loading状态
    }
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      // 获取表单数据
      const user = this.user
      // 表单验证
      // 开启loading 解决慢速网络中的重复点击操作
      this.loginLoading = true
      // 验证通过，提交登录
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data: user // post请求体
      })
        .then(result => {
          console.log(result)
          this.$message({
            message: '恭喜你，登录成功',
            type: 'success'
          })
          // 关闭登录按钮loading
          this.loginLoading = false
        })
        .catch(err => {
          console.log(err)
          this.$message.error('登录失败，请稍后重试！')
          // 关闭登录按钮loading
          this.loginLoading = false
        })
      // 处理后端相应结果
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //登录页面背景图片
  background: url("./bgimage.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
      min-width: 300px;
      padding: 20px 30px 0px;
      background-color: #fff;
      .login-head {
        display: flex;
        justify-content: center;
        .logo {
          width: 200px;
          height: 57px;
          background: url('./logo_index.png') no-repeat;
          background-size: contain;
        }
      }
      .login-form{
      background-color: #fff;
      padding:20px 20px 10px 20px;
      min-width: 300px;
        .login-btn{
        width:100%;
        }
  }
  }
}
</style>
