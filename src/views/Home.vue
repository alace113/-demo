<template>
  <div class="home">
    <Usamap :year='year' :title-name='titlename' @change="change"></Usamap>
  </div>
</template>

<script>
// @ is an alias to /src
import Usamap from '@/components/Usamap.vue'
// import Area from '@/components/Area.vue'
// import Bar from '@/components/Bar.vue'
// import Line from '@/components/Line.vue'
// import Pix from '@/components/Pix.vue'
// import Wordcloud from '@/components/Wordcloud.vue'

export default {
  name: 'Home',
  data () {
    return {
      year: 2016,
      titlename: 'us'
    }
  },
  components: {
    Usamap
  },
  methods: {
    change (event) {
      this.year = event[0]
      this.titlename = event[1]
    }
  }
}
</script>
