<template>
  <div class="home-container">
    <el-card>
      <el-row>
        <el-col
          :span="12"
          class="lf_container"
        >
          <el-tabs v-model="activeName">
            <el-tab-pane
              label="数据概览"
              name="first"
            >
              <el-row :gutter="20">
                <el-col
                  :span="12"
                  class="col-wrap"
                >
                  <el-card>
                    <p class="text-title">阅读量</p>
                    <p class="text-number">16887</p>
                    <p class="last-day">
                      较前日
                      <span class="green-num">-11.5%</span>
                    </p>
                  </el-card>
                </el-col>
                <el-col
                  :span="12"
                  class="col-wrap"
                >
                  <el-card>
                    <p class="text-title">评论量</p>
                    <p class="text-number">388</p>
                    <p class="last-day">
                      较前日
                      <span class="green-num">-7.8%</span>
                    </p>
                  </el-card>
                </el-col>
                <el-col
                  :span="12"
                  class="col-wrap"
                >
                  <el-card>
                    <p class="text-title">收藏量</p>
                    <p class="text-number">1256</p>
                    <p class="last-day">
                      较前日
                      <span class="red-num">+9.53%</span>
                    </p>
                  </el-card>
                </el-col>
                <el-col
                  :span="12"
                  class="col-wrap"
                >
                  <el-card>
                    <p class="text-title">转发量</p>
                    <p class="text-number">125</p>
                    <p class="last-day">
                      较前日
                      <span class="red-num">+0.7%</span>
                    </p>
                  </el-card>
                </el-col>
              </el-row>
              <!-- 折线图 -->
              <el-row class="table-wrap">
                <el-tabs v-model="activeName">
                  <el-tab-pane
                    label="数据趋势"
                    name="first"
                  />
                </el-tabs>
                <el-col :span="24">
                  <SevenDays />
                  <el-checkbox-group
                    class="checkbox-wrap"
                    v-model="checkedCities"
                  >
                    <el-checkbox
                      v-for="city in cities"
                      :label="city"
                      :key="city"
                    >{{city}}</el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col
          :span="12"
          class="rt_container"
        >
          <el-row>
            <el-col :span="24">
              <el-carousel
                height="280px"
                direction="vertical"
                :autoplay="true"
              >
                <el-carousel-item
                  v-for="(img,index) in imgList"
                  :key="index"
                >
                  <img
                    class="item-img"
                    :src="img"
                    alt
                  />
                </el-carousel-item>
              </el-carousel>
            </el-col>
            <el-col :span="24">
              <el-row
                class="other-module"
                :gutter="20"
              >
                <el-col :span="12">
                  <el-card>
                    <div class="hot-head">
                      <span class="module-name">
                        热门活动
                        <i class="el-icon-s-flag"></i>
                      </span>

                      <span class="more">
                        更多
                        <i class="el-icon-arrow-right"></i>
                      </span>
                    </div>
                    <div class="hot-body">
                      <ul class="hot-list">
                        <li
                          class="hot-item"
                          v-for="(item, index) in hotList"
                          :key="index"
                        >
                          <span class="hot-title">{{item.name}}</span>
                          <span class="hot-icon">HOT</span>
                          <span class="hot-count">{{item.count}}万人参与</span>
                        </li>
                      </ul>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card>
                    <div class="hot-head">
                      <span class="module-name">
                        创作热榜
                        <i class="el-icon-s-data"></i>
                      </span>
                      <span class="more">
                        更多
                        <i class="el-icon-arrow-right"></i>
                      </span>
                    </div>
                    <div class="hot-body">
                      <ul class="hot-list">
                        <li
                          class="hot-item"
                          v-for="(item, index) in writeList"
                          :key="index"
                        >
                          <span class="hot-title">{{item.name}}</span>
                          <!-- <span class="hot-icon">HOT</span> -->
                          <span class="hot-count">{{item.count}}赞<i></i></span>
                        </li>
                      </ul>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import SevenDays from './components/sevenDays.vue'
const cityOptions = ['阅读量', '评论量', '收藏量', '转发量']
export default {
  name: 'HomeIndex',
  data () {
    return {
      activeName: 'first',
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true,
      hotList: [
        { name: '打卡挑战', count: '21.5' },
        { name: '知识分享官', count: '15.5' },
        { name: '大咖面对面', count: '11.8' },
        { name: '云原生可观测性分享会', count: '9.9' },
        { name: '数据库分享者大会', count: '6.8' },
        { name: '前段技术论坛', count: '3.8' },
        { name: '性能优化大赛', count: '2.1' }
      ],
      writeList: [
        { name: '《谁动了我的数据》', count: '5000' },
        { name: '《一个由mouseleave引发的bug》', count: '4000' },
        { name: '《深入浅出虚拟 DOM 和 Diff 算法》', count: '3000' },
        { name: '《用 Canvas 实现123木头人游戏》', count: '2000' },
        { name: '《展开操作符：一家人就这么被拆散了》', count: '1000' },
        { name: '《实用 JavaScript 调试技巧》', count: '1000' },
        { name: '《原生微信小程序的优化》', count: '1000' }
      ],
      imgList: [
        'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d48376cd32fc49158adcf9528401fa68~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?',
        'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d35b8cdc4f4740eeb6261a5aff9019f0~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp',
        'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27b20ab0de7a4a51a840258f13440aae~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?'
      ]
    }
  },
  components: { SevenDays },
  props: {},
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style lang="less" scoped>
  .col-wrap {
    padding-bottom: 20px;
    p {
      margin: 0;
    }
    .text-title {
      color: #4e5969;
      font-size: 14px;
      line-height: 22px;
    }
    .text-number {
      color: #1d2129;
      font-weight: 600;
      font-size: 32px;
      line-height: 42px;
      margin-bottom: 4px;
      white-space: nowrap;
    }
    .last-day {
      color: #4e5969;
      font-size: 12px;
      white-space: nowrap;
      .green-num {
        color: green;
      }
      .red-num {
        color: red;
      }
    }
  }
  .checkbox-wrap {
    margin-left: 60px;
  }

  .table-wrap {
    .table-name {
      margin-left: 20px;
      margin-top: 20px;
    }
  }
  .rt_container {
    padding-top: 38px;
    padding-left: 25px;
    /deep/.el-carousel {
      border-radius: 10px;
    }
  }
  .other-module {
    padding-top: 65px;
    .hot-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .module-name {
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        color: #222;
        /deep/.el-icon-s-flag {
          color: rgb(230, 55, 55);
        }
        /deep/.el-icon-s-data {
          color: orangered;
        }
      }
      .more {
        font-size: 14px;
        line-height: 20px;
        color: #666666;
        cursor: pointer;
        white-space: nowrap;
      }
    }
    .hot-body {
      padding-top: 20px;
      .hot-list {
        list-style: none;
        margin: 0;
        padding: 0;
        .hot-item {
          height: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .hot-title {
            text-align: left;
            font-size: 14px;
            color: #212121;
            letter-spacing: 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .hot-count {
            font-size: 12px;
            color: #757575;
            letter-spacing: 0;
            // text-align: right;
            white-space: nowrap;
            margin-left: 5px;
          }
          .hot-icon {
            background-color: orange;
            color: #fff;
            font-size: 20px;
            padding: 2px;
            transform: scale(0.5);
          }
        }
      }
    }
  }
  .item-img {
    width: 100%;
  }
</style>
