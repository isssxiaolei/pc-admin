<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.query.id? '修改文章':'发表文章'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form
        ref="publish-form"
        :model="article"
        label-width="60px"
        :rules="formRules"
      >
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item
          label="内容"
          prop="content"
        >
          <!-- <el-input
            type="textarea"
            v-model="article.content"
          ></el-input>-->
          <el-tiptap
            lang="zh"
            height="350"
            placeholder="请输入文章内容"
            v-model="article.content"
            :extensions="extensions"
          ></el-tiptap>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- <template v-if="article.cover.type > 0">
            <UploadCover
              v-for="(cover,index) in article.cover.type"
              :key="cover"
              :cover-image="article.cover.images[index]"
              @update-cover="onUpdateCover(index,url)"
            />
          </template>-->
          <template v-if="article.cover.type > 0">
            <UploadCover
              v-for="(cover,index) in article.cover.type"
              :key="cover"
              v-model="article.cover.images[index]"
            />
          </template>
        </el-form-item>
        <el-form-item
          label="频道"
          prop="channel_id"
        >
          <el-select
            v-model="article.channel_id"
            placeholder="请选择频道"
          >
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel, index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="onPublish(false)"
          >{{$route.query.id? '修改':'发表'}}</el-button>
          <el-button
            v-if="$route.query.id"
            @click="onCancel"
          >取消操作</el-button>
          <el-button
            v-else
            @click="onPublish(true)"
          >存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import UploadCover from './components/upload-cover.vue'
import { getChannels, publishArticle, getEditArticle, updateArticle } from '@/api/article.js'
import { uploadImage } from '@/api/image.js'
// import element-tiptap 样式
import 'element-tiptap/lib/index.css'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  Image,
  CodeBlock,
  Blockquote,
  TextColor,
  TextHighlight
} from 'element-tiptap'
export default {
  name: 'PublishIndex',
  data () {
    return {
      channels: [], // 文章频道列表
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 1, // 封面类型
          images: [] // 封面图片的地址
        },
        channel_id: null
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image({
          // 自定义图片上传，默认把图片生成base64字符串和内容在一起
          uploadRequest (file) {
            // 如果接口要求请求头中的Content-Type为multipart/form-data，
            // 请求体必须使用FormData()
            const fd = new FormData()
            fd.append('image', file)
            // 第一个return是返回的promise对象
            return uploadImage(fd).then(res => {
              console.log(res)
              // 这个return是返回的结果
              return res.data.data.url
            })
          }
        }),
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new HorizontalRule(),
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock(),
        new Blockquote(),
        new TextColor(),
        new TextHighlight()
      ],
      formRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                callback(new Error('请输入文章内容'))
              } else {
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel_id: [{ required: true, message: '请选择文章频道' }]
      }
    }
  },
  components: {
    'el-tiptap': ElementTiptap,
    UploadCover
  },
  props: {},
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
    // 由于发布和编辑使用的同一个组件 所以这里要判断
    // 如果路由路径参数中有id，则请求展示文章内容
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  mounted () {},
  methods: {
    onCancel () {
      this.$route.query.id = ''
      this.$router.push('/article')
    },
    onPublish (draft = false) {
      this.$refs['publish-form'].validate(valid => {
        if (!valid) {
          return false
        }
        // 如果是修改文章，则执行修改操作，否则执行添加操作
        const articleId = this.$route.query.id
        if (articleId) {
          // 执行修改操作
          updateArticle(articleId, this.article, draft).then(res => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            })
            // 跳转到内容管理
            this.$router.push('/article')
          })
        } else {
          publishArticle(this.article, draft).then(res => {
            this.$message({
              message: draft === false ? '发布成功！' : '已存为草稿',
              type: 'success'
            })
            // 跳转到内容管理
            this.$router.push('/article')
          })
        }
      })
    },
    loadChannels () {
      getChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    // 修改文章：加载文章内容
    loadArticle () {
      // 通过ID获取指定文章
      getEditArticle(this.$route.query.id).then(res => {
        // 模板绑定展示
        this.article = res.data.data
      })
    },
    onUpdateCover (index, url) {
      this.article.cover.images[index] = url
    }
  }
}
</script>
<style lang="less" scoped>
</style>
