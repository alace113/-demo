<template>
  <div id='Map-chart' ref="Mapchart" style="weight: 1000px;height: 600px" @contextmenu.prevent='revertMap'></div>
</template>

<script>
import proj4 from 'proj4'

export default {
  name: 'Usamap',
  data () {
    return {
      map: null, // 图表,
      pointData: null,
      areaData: null,
      transform: null // highcharts地图里面proj4转换参数
    }
  },
  // 父组件传值
  props: [
    'year',
    'titlename'
  ],
  mounted () {
    this.initMapChart()
    this.getData().then(() => {
      this.updateMapChart()
    })
  },
  methods: {
    async initMapChart () {
      this.map = this.$echarts.init(this.$refs.Mapchart)
      // 获取地图和矢量数据
      const { data: mapData } = await this.$axios.get('/mapjs/us.js')
      this.transform = mapData['hc-transform'].default
      this.$echarts.registerMap('us', mapData)
      const initOption = {
        baseOption: {
          timeline: {
            axisType: 'category',
            autoplay: false,
            currentIndex: 0,
            controlStyle: {
              showPlayBtn: false
            },
            data: [2016, 2017, 2018, 2019, 2020],
            label: {
              formatter: (s) => {
                return (new Date(s)).getFullYear()
              }
            }
          }
        },
        title: {
          text: mapData.title,
          left: 'center'
        },
        // 地图样式
        geo: {
          map: 'us',
          roam: true,
          label: {
            emphasis: {
              show: true
            }
          },
          zoom: 1.2,
          backgroundColor: '#404a59'
        }
      }
      this.map.setOption(initOption)
      // 点击
      this.map.on('click', async (params) => {
        console.log(params)
        const stateInfo = mapData.features
        for (var j = 0, len = stateInfo.length; j < len; j++) {
          if (params.name === (stateInfo[j].properties.name)) {
            const { data: mapData } = await this.$axios.get('/mapjs/' + stateInfo[j].properties['hc-key'] + '.js')
            this.$echarts.registerMap(params.name, mapData)
            const changeOption = {
              geo: {
                map: params.name
              },
              title: {
                text: mapData.title,
                left: 'center'
              }
            }
            this.map.setOption(changeOption)
            break
          }
        }
        this.$emit('change', [this.year, params.name])
        this.transform = mapData['hc-transform'].default
      })
      this.map.on('timelineChanged', (param) => {
        this.$emit('change', [parseInt(param.currentIndex) + 2016, this.titlename])
      })
    },
    updateMapChart () {
      const dataOption = {
        series: [
          {
            type: 'scatter',
            // data: [{ value: [7777, 7777] }],
            data: this.pointData,
            coordinateSystem: 'geo',
            symbolSize: 30,
            itemStyle: {
              // color: 'rgba(240,221,93,0.4)'
              color: 'red'
            }
          },
          {
            name: '美国地图',
            type: 'map',
            data: [],
            coordinateSystem: 'geo', // 地图配置
            encode: {
              value: 2
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: '#ff3030',
                shadowBlur: 1
              }
            },
            tooltip: {
              trigger: 'item',
              showDelay: 1,
              formatter: '<b>'
            }
          }
        ]
      }
      this.map.setOption(dataOption)
    },
    // 单个转换坐标函数
    Transformer (transform, lon, lat) {
      if (typeof lon === 'string') {
        lon = parseFloat(lon)
      }
      if (typeof lat === 'string') {
        lat = parseFloat(lat)
      }
      var projected = proj4(transform.crs, [lon, lat])
      var cosAngle = transform.cosAngle || (transform.rotation && Math.cos(transform.rotation))
      var sinAngle = transform.sinAngle || (transform.rotation && Math.sin(transform.rotation))
      var rotated = transform.rotation ? [projected[0] * cosAngle + projected[1] * sinAngle, -projected[0] * sinAngle + projected[1] * cosAngle] : projected
      return [
        parseInt(((rotated[0] - (transform.xoffset || 0)) * (transform.scale || 1) + (transform.xpan || 0)) * (transform.jsonres || 1) + (transform.jsonmarginX || 0)),
        parseInt((((transform.yoffset || 0) - rotated[1]) * (transform.scale || 1) + (transform.ypan || 0)) * (transform.jsonres || 1) - (transform.jsonmarginY || 0))
      ]
    },
    // 获取数据
    async getData (year = 2016, titlename = null) {
      const { data: pointData } = await this.$axios.get('/data/coordinate.json')
      this.pointData = pointData
      // console.log(typeof this.pointData[0])
      for (var j = 0, len = pointData.length; j < len; j++) {
        this.pointData[j].value = this.Transformer(this.transform, this.pointData[j].value[0], this.pointData[j].value[1])
      }
    },
    // 右键点击返回美国地图
    revertMap () {
      const revertOption = {
        geo: {
          map: 'us'
        }
      }
      this.map.setOption(revertOption)
    }
    // 传递参数
  },
  watch: {
    year (newYear, oldYear) {
      this.getData(newYear, this.name)
      console.log(newYear)
    },
    titlename (newName, oldName) {
      this.getData(this.year, newName)
    }
  }
}
</script>

<style scoped>
</style>
