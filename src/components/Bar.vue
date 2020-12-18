<template>
  <div id='Bar-chart' ref="Barchart" style="width: 300px;height: 300px" @contextmenu.prevent="revertChart"></div>
</template>

<script>
export default {
  name: 'Bar',
  props: ['year'],
  mounted () {
    this.initBarChart()
  },
  methods: {
    initBarChart () {
      var bar = this.$echarts.init(this.$refs.Barchart)
      var option = {
        xAxis: {
          type: 'category'
          // data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          // data: [dsadsa],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220,220,220,0.8'
          }
        }]
      }
      bar.setOption(option)
      bar.on('click', function (params) {
        console.log(params)
        //
      })
    },
    getData () {

    },
    revertBar () {
      this.initBarChart()
    }
  },
  watch: {
    year (newYear, oldYear) {

    }
  }
}
</script>

<style scoped>

</style>
