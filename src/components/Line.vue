<template>
  <div class='el-container'>
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :label="item.label" :key="item.value" :value="item.value" @click="handleSelect(item.value)">

      </el-option>
    </el-select>
    <div id='Line-chart' ref="Linechart" style="width: 300px;height: 100px"></div>
  </div>
</template>

<script>
export default {
  name: 'Line',
  data () {
    return {
      selectType: [
        {
          value: '1',
          label: '朝夕'
        },
        {
          value: '2',
          label: '严重程度'
        }],
      chooseType: '1'
    }
  },
  props: ['titlename', 'year'],
  mounted () {
    this.initLineChart()
  },
  methods: {
    initLineChart () {
      var line = this.$echarts.init(this.$refs.Linechart)
      var option = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        title: {
          left: 'center',
          title: '历年对比'
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false
          // data: date见官网
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 10
        }, {
          start: 0,
          end: 10,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        series: [
          {
            name: '白天',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            }
            // data: data
          },
          {
            name: '晚上',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            }
            // data: data
          }
        ]
      }
      line.setOption(option)
    },
    getData () {

    },
    handleSelect (value) {
      this.chooseType = value
    }
  },
  watch: {
    chooseType (newType, oldType) {

    }
  }
}
</script>

<style scoped>

</style>
