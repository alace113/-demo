<template>
  <div id='Wordcloud-chart' ref="Wordcloudchart" style="width: 300px;height: 300px"></div>
</template>

<script>
require('echarts-wordcloud')

export default {
  name: 'Wordcloud',
  props: ['year'],
  mounted () {
    this.initWordcloudChart()
  },
  methods: {
    initWordcloudChart () {
      var wordcloud = this.$echarts.init(this.$refs.Wordcloudchart)
      var maskImage = new Image()
      maskImage.src = 'data:image/png;base64,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'
      maskImage.onload = function () {
        var option = {
          backgroundColor: '#fff',
          tooltip: {
            pointFormat: '{series.name}:<b> {point.percentage:.1f}%<b>'
          },
          series: [{
            type: 'wordCloud',
            gridSize: 1,
            sizeRange: [12, 55], // 字的大小范围
            rotationRange: [-90, 90],
            rotationStep: 45,
            maskImage: maskImage,
            textStyle: {
              normal: {
                color: function () {
                  return 'rgb(' + Math.round(Math.random() * 255) +
                  ',' + Math.round(Math.random() * 255) +
                    ',' + Math.round(Math.random() * 255) + ')'
                }
              }
            },
            left: 'center',
            top: 'center',
            width: '70%',
            height: '80%',
            right: null,
            bottom: null,
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
            // data: [{}]
          }]
        }
        wordcloud.setOption(option)
      }
    },
    getData () {

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
