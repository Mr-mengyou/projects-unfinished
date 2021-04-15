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
    getTypeData(type = 'matchType' || type) {
      let chartDom = document.getElementById('main')
      let myChart = echarts.init(chartDom)
      let option
      getChartDataApi(type).then((res) => {
        console.log(res.echartsList)
        let array = res.echartsList
        let keyArr

        if (type == 'matchType') keyArr = matchType(array)
        if (type == 'majorType') keyArr = majorType(array)
        if (type == 'departType') keyArr = departType(array)
        console.log(keyArr)
        // let obj = {}
        // array.forEach((item) => {
        //   if (!obj[item[this.Type]])
        //     obj[item['awardName']] = [item['awardName']]
        // })
        // let year = []

        // array.forEach((item) => {
        //   if (year.indexOf(item.awardDate) == -1) year.push(item.awardDate)
        // })

        // for (let key in obj) {
        //   for (let i = 0; i < year.length; i++) {
        //     if (
        //       array.find((item) => {
        //         if (item.awardName == key && item.awardDate == year[i])
        //           return true
        //       }) !== undefined
        //     )
        //       continue
        //     else {
        //       array.push({ awardName: key, awardDate: year[i], count: 0 })
        //     }
        //   }
        // }

        // for (let i = 0; i < year.length; i++) {
        //   for (let j = 0; j < array.length; j++) {
        //     if (array[j].awardDate == year[i]) {
        //       if (array[j].count !== 0) {
        //         obj[array[j].awardName].push(array[j].count)
        //       } else {
        //         obj[array[j].awardName].push(0)
        //       }
        //     }
        //   }
        // }
        // let keyArr = []
        // for (let key in obj) {
        //   keyArr.push(obj[key])
        // }
        // console.log('keyArr' + keyArr)

        setTimeout(function() {
          option = {
            legend: {},
            tooltip: {
              trigger: 'axis',
              showContent: false,
            },

            dataset: {
              source: [
                res.yearList,

                // ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
                // ['计算机大赛', 0, 2, 3, 4, 5, 6],
                // ['创新创业大赛', 2, 3, 4, 5, 6, 7],
                // ['蓝桥杯大赛', 2, 4, 6, 8, 9, 10],
                // ['大数据大赛', 3, 4, 5, 6, 1, 7],
              ],
            },
            xAxis: { type: 'category' },
            yAxis: { gridIndex: 0 },
            grid: { top: '55%' },
            series: [
              {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series' },
              },
              {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series' },
              },
              {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series' },
              },
              {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series' },
              },
              {
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
              },
            ],
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

          option.series[4].encode.value = res.yearList[1]
          option.series[4].encode.tooltip = res.yearList[1]
          option.series[4].label = {
            formatter: '{b}: {@' + res.yearList[1] + '} ({d}%)',
          }
          myChart.setOption(option)
        })
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
