<template>
  <el-main style="text-align:center">
    <div style="margin:0 auto">
      <el-button @click="getTypeData('matchType')">比赛类别统计图</el-button>
      <el-button @click="getTypeData('majorType')">专业统计图</el-button>
      <el-button @click="getTypeData('departType')">学院统计图</el-button>
    </div>
    <div id="main"></div>
  </el-main>
</template>

<script>
import { getChartDataApi } from '../../request/api'
import { matchType, majorType, departType } from '../../static/js/test'

var echarts = require('echarts')
export default {
  data() {
    return {}
  },
  created() {},
  mounted() {
    this.getTypeData()
  },

  methods: {
    getTypeData(type = 'majorType' || type) {
      let chartDom = document.getElementById('main')
      let myChart = echarts.init(chartDom)
      myChart.clear()
      let option = {}

      getChartDataApi(type).then((res) => {
        console.log(res.echartsList)
        let array = res.echartsList
        let keyArr
        let legendList = []

        if (type == 'matchType') keyArr = matchType(array)
        if (type == 'majorType') keyArr = majorType(array)
        if (type == 'departType') keyArr = departType(array)

        keyArr.forEach((e) => {
          legendList.push({ name: e[0] })
        })
        console.log(legendList)
        option = {
          legend: {
            data: legendList,
          },

          tooltip: {
            trigger: 'axis',
            showContent: false,
          },

          dataset: {
            source: [res.yearList],
          },
          xAxis: { type: 'category' },
          yAxis: { gridIndex: 0 },
          grid: { top: '55%' },
          series: [],
        }

        myChart.on('updateAxisPointer', function(event) {
          var xAxisInfo = event.axesInfo[0]
          if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1
            myChart.setOption({
              series: {
                id: 'pie',
                label: {
                  formatter: '{b}: {@[' + dimension + ']} ({d}%)',
                },
                encode: {
                  value: dimension,
                  tooltip: dimension,
                },
              },
            })
          }
        })
        keyArr.forEach((e) => {
          option.dataset.source.push(e)
        })

        for (let i = 0; i < option.dataset.source.length - 1; i++) {
          option.series.push({
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' },
            name: option.dataset.source[i + 1][0],
          })
        }
        option.series.push({
          type: 'pie',
          id: 'pie',
          radius: '30%',
          center: ['50%', '25%'],
          emphasis: { focus: 'data' },
          label: '',

          encode: {
            itemName: 'product',
            value: '',
            tooltip: '',
          },
        })
        console.log(option.color)
        console.log(option.legend.data)
        console.log(option.dataset.source)
        console.log('series', option.series)

        option.series[option.series.length - 1].encode.value = res.yearList[1]
        option.series[option.series.length - 1].encode.tooltip = res.yearList[1]
        option.series[option.series.length - 1].label = {
          formatter: '{b}: {@' + res.yearList[1] + '} ({d}%)',
        }
        myChart.setOption(option)
      })
    },
    getMajorData() {},
    getDepartData() {},
  },
}
</script>

<style>
#main {
  width: 100%;
  height: 500px;
  margin-top: 20px;
}
#isSelected {
  margin-left: 20px;
  margin-bottom: 20px;
}
</style>
