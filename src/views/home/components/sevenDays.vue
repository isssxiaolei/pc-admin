<template>
  <div class="seven-container">
    <div
      id="main"
      style="width:100%;height:400px;"
    ></div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: 'sevenDays',
  data () {
    return {}
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  created () {},
  mounted () {
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)
    var option

    option = {
      xAxis: {
        type: 'category',
        data: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [15622, 9856, 18888, 16666, 54656, 34128, 56424],
          type: 'line'
        }
      ]
    }

    option && myChart.setOption(option)
  },
  methods: {}
}
</script>
<style lang="less" scoped>
</style>
