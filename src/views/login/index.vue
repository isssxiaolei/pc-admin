<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <!-- 配置表单验证：
      1.为el-form组件绑定model为表单数据对象
      2.给需要验证的表单项绑定prop属性
      3.使用rules属性配置验证规则

      手动触发表单验证
      1.给表单设置ref
      2. 通过ref获取到该组件，调用组件的validate进行验证
      -->
      <el-form
        class="login-form"
        ref="login-form"
        :model="user"
        :rules="formRules"
      >
        <el-form-item prop="mobile">
          <el-input
            v-model="user.mobile"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="user.code"
            placeholder="请输入验证码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
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
import { userLogin } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810', // 验证码
        agree: false // 是否同意协议
      },
      loginLoading: false, // 登录按钮loading状态
      formRules: {
        // 表单验证配置对象
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号码格式错误！', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码格式错误！', trigger: 'change' }
        ],
        agree: [
          // 如果验证通过callback
          // 验证失：callback(new error('错误消息'))
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
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
      // const user = this.user
      // 表单验证
      this.$refs['login-form'].validate(valid => {
        // 如果验证失败，请求停止
        if (!valid) {
          return false
        }
        this.login()
      })
    },
    login () {
      // 开启loading 解决慢速网络中的重复点击操作
      this.loginLoading = true
      // 验证通过，提交登录
      userLogin(this.user)
        .then(result => {
          console.log(result)
          this.$message({
            message: '恭喜你，登录成功',
            type: 'success'
          })
          // 关闭登录按钮loading
          this.loginLoading = false
          // 将接口返回的用户数据存储到本地，方便应用数据共享
          window.localStorage.setItem('user', JSON.stringify(result.data.data))
          this.$router.push({
            name: 'home'
          })
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
  .login-container {
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
    background: url('./bgimage.jpg') no-repeat;
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
          background: url('./logo.png') no-repeat;
          background-size: contain;
        }
      }
      .login-form {
        background-color: #fff;
        padding: 20px 20px 10px 20px;
        min-width: 300px;
        .login-btn {
          width: 100%;
        }
      }
    }
  }
</style>
