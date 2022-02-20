<template>
  <div class="settings-container">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="15">
          <el-form
            :rules="rules"
            ref="profile-form"
            :model="userProfile"
            label-width="80px"
            label-position="left"
          >
            <el-form-item label="编号">{{userProfile.id}}</el-form-item>
            <el-form-item label="手机">{{userProfile.mobile}}</el-form-item>
            <el-form-item
              label="媒体名称"
              prop="name"
            >
              <el-input v-model="userProfile.name"></el-input>
            </el-form-item>
            <el-form-item
              label="媒体介绍"
              prop="intro"
            >
              <el-input
                type="textarea"
                v-model="userProfile.intro"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="邮箱"
              prop="email"
            >
              <el-input v-model="userProfile.email"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                type="success"
                icon="el-icon-edit"
                :loading="loadingProfile"
                @click="onUpdateUserInfo"
              >立即保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col
          :offset="4"
          :span="4"
        >
          <label for="file">
            <el-avatar
              shape="square"
              :size="150"
              fit="cover"
              :src="userProfile.photo"
            ></el-avatar>

            <el-button
              style="width:150px"
              @click="$refs.file.click()"
              icon="el-icon-upload"
            >点击修改头像</el-button>
          </label>
          <input
            id="file"
            type="file"
            ref="file"
            hidden
            @change="onFileChange"
          />
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      append-to-body
      width="30%"
      @opened="onDialogOpened"
      @closed="onDialogClosed"
    >
      <div class="preview-image-wrap">
        <img
          class="preview-image"
          ref="previewImage"
          :src="previewImage"
        />
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="loadingAvatar"
          @click="onUpdatePhoto"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getUserProfile, updateUserPhoto, updateUserProfile } from '@/api/user.js'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import globalBus from '@/utils/global-bus.vue'

export default {
  name: 'SettingIndex',
  data () {
    return {
      rules: {
        name: [
          { min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: 'change' },
          { required: true, message: '昵称不能为空', trigger: 'change' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'change' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        intro: [
          { required: true, message: '请添加个人介绍', trigger: 'change' },
          { min: 1, max: 100, message: '长度在 1 到 60个字符', trigger: 'change' }
        ]
      },
      userProfile: {
        email: '',
        id: null,
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      },
      dialogVisible: false, // 控制上传图片弹出层显示状态
      previewImage: '', // 图片预览
      cropper: null, // 裁切器实例
      loadingAvatar: false, // 修改头像的loading
      loadingProfile: false // 用户信息修改的loading
    }
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.userProfile = res.data.data
      })
    },
    onFileChange () {
      // 处理图片预览
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      this.previewImage = blobData
      this.dialogVisible = true
      /*
      1. 获取文件对象
      2. 将文件对象中的files转换为blob数据
      3. 将blob地址绑定到img标签的src属性
      */
      this.$refs.file.value = '' // 解决选择相同文件 不触发 change事件问题
    },

    onDialogOpened () {
      // 确保图片被渲染出之后
      // img必须是可见状态且基于img进行初始化的
      // 因为我们实在爱对话框里初始化裁切器
      // 所以务必要在对话框被渲染出之后进行初始化
      // 展示弹出层，预览图片
      const image = this.$refs.previewImage
      // 第一次初始化好以后，如果预览裁切的图片发生改变的话
      // 裁切器默认不会更新
      // 解决方法：
      // 1.裁切器的replace方法 用新的图片地址替换之前的地址
      // 2.使用v-if将裁切器销毁 重新渲染
      if (this.cropper) {
        this.cropper.replace(this.previewImage)
        return false
      }
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'none',
        cropBoxMovable: false,
        cropBoxResizable: false,
        background: false,
        movable: true
      })
    },
    onDialogClosed () {
      // 对话框关闭，销毁裁切器
      // this.cropper.destroy()
    },
    onUpdatePhoto () {
      // 开启loading
      this.loadingAvatar = true
      // 获取裁切的图片对象
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        // 请求更新用户头像
        // 提交fd
        updateUserPhoto(fd)
          .then(res => {
            // 关闭对话框
            this.dialogVisible = false
            // 更新视图
            // this.userProfile.photo = res.data.data.photo
            this.userProfile.photo = window.URL.createObjectURL(file)
            this.$message.success('头像已修改！')
            this.loadingAvatar = false // 关闭确定按钮的loading
            // 实时更新头部当前登录用户的信息
            globalBus.$emit('update-user', this.userProfile)
          })
          .catch(() => {
            this.dialogVisible = false
            this.$message.error('图片太大了啦！换一张嘛~')
          })
      })
    },
    onUpdateUserInfo () {
      this.$refs['profile-form'].validate(valid => {
        // 如果验证失败，请求停止
        if (!valid) {
          return false
        }
        updateUserProfile({ name, intro, email })
      })
      // 开启loading状态
      this.loadingProfile = true
      const { name, intro, email } = this.userProfile
      updateUserProfile({ name, intro, email }).then(res => {
        this.$message.success('修改成功')
      })
      // 关闭loading状态
      this.loadingProfile = false
      // 实时更新头部当前登录用户的信息
      globalBus.$emit('update-user', this.userProfile)
    }
  }
}
</script>
<style lang="less" scoped>
  .preview-image-wrap {
    .preview-image {
      display: block;
      max-width: 100%;
    }
  }
</style>
