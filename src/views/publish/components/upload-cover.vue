<template>
  <div class="upload-cover">
    <div
      class="cover-wrap"
      @click="showCoverSelect"
    >
      <img
        v-show="value"
        class="cover-image"
        ref="cover-image"
        alt
        :src="value"
      />
      <img
        v-if="!value"
        class="cover-image"
        src="./upload.png"
        alt
      />
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <el-tabs
        v-model="activeName"
        type="card"
      >
        <el-tab-pane
          label="素材库"
          name="first"
        >
          <ImageList
            :isShowAdd="false"
            :isShowAction="false"
            isShowSelected
            ref="image-list"
          />
          <!-- ref有两个作用： -->
          <!-- 作用到普通HTML标签上可以获取DOM -->
          <!-- 作用到组件上可以获取组件 -->
        </el-tab-pane>
        <el-tab-pane
          label="本地上传"
          name="second"
          class="cover-wrap"
        >
          <label for="file-upload">
            <input
              id="file-upload"
              ref="file"
              type="file"
              @change="onFileChange"
              hidden
            />
            <img
              v-show="previewBlob"
              class="cover-image"
              ref="preview-image"
              src
            />
            <img
              v-if="!previewBlob"
              class="cover-image"
              src="./upload.png"
              alt
            />
          </label>
        </el-tab-pane>
      </el-tabs>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="onCancelCover">取 消</el-button>
        <el-button
          type="primary"
          @click="onCoverConfirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ImageList from '@/views/image/components/image-list.vue'
import { uploadImage } from '@/api/image.js'
export default {
  name: 'Uploadcover',
  data () {
    return {
      dialogVisible: false,
      activeName: 'first',
      previewBlob: ''
    }
  },
  components: { ImageList },
  props: ['value'],
  // props: ['cover-image'],
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    showCoverSelect () {
      this.dialogVisible = true
    },
    onFileChange () {
      const file = this.$refs.file.files[0] // 获取文件对象
      const blob = window.URL.createObjectURL(file) // 转化为blob数据用于图片预览
      this.previewBlob = blob
      this.$refs['preview-image'].src = blob
      //  // 防止用户选择同一个文件不触发事件
    },
    onCoverConfirm () {
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        if (!file) {
          this.$message('请选择文件')
          return false
        }
        // 上传文件操作
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          this.dialogVisible = false
          this.$refs['cover-image'].src = res.data.data.url
          // 子组件向父组件传递数据
          // this.$emit('update-cover', res.data.data.url)
          this.$emit('input', res.data.data.url)
        })
      } else if (this.activeName === 'first') {
        const imageList = this.$refs['image-list']
        const selected = imageList.selected
        if (selected === null) {
          this.$message('请选择封面图片')
          return false
        }
        this.$emit('input', imageList.images[selected].url)
        this.dialogVisible = false
      }
    },
    onCancelCover () {
      this.dialogVisible = false
      this.$refs.file.value = ''
      this.previewBlob = ''
      this.$refs['preview-image'].src = ''
    }
  }
}
</script>
<style lang="less" scoped>
  .cover-wrap {
    width: 150px;
    height: 150px;
    border: 1px dashed #ccc;
    position: relative;
    margin-right: 20px;
    .cover-image {
      height: 150px;
      max-width: 100%;
    }
    /deep/.el-icon-picture-outline {
      position: absolute;
      font-size: 40px;
      top: 50%;
      left: 50%;
      margin-left: -20px;
      margin-top: -22px;
    }
  }
</style>
