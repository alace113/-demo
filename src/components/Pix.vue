<template>
  <div id='Pix-chart' ref="Pixchart" style="width: 300px;height: 300px"></div>
</template>

<script>
export default {
  name: 'Pix',
  props: ['year', 'titlename'],
  mounted () {
    this.initPixChart()
  },
  methods: {
    initPixChart () {
      var pix = this.$echarts.init(this.$refs.Pixchart)
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 200
          // data: []
        },
        series: [{
          name: '严重程度统计',
          type: 'pie',
          radius: ['30%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 30,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          }
          // data:[]
        }]
      }
      pix.setOption(option)
    },
    getData () {

    }
  },
  watch: {
    year (newYear, oldYear) {

    },
    titlename (newName, oldName) {

    }
  }
}
</script>

<style scoped>

</style>
