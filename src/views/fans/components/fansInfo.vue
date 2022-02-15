<template>
  <div class="fansInfo-container">
    <div
      id="main"
      style="width: 1200px;height:600px;"
    ></div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import { getFansInfo } from '@/api/user.js'
export default {
  name: 'fansInfo',
  data () {
    return {}
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  created () {
    this.loadFansInfo()
  },
  mounted () {
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)
    var option

    option = {
      xAxis: {
        type: 'category',
        data: ['18-24岁', '25-30岁', '31-35岁', '36-40岁', '41-45岁', '46-50岁', '50岁以上']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    }

    option && myChart.setOption(option)
  },
  methods: {
    loadFansInfo () {
      getFansInfo({
        type: 'c',
        source: '1493476452534845440181'
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
