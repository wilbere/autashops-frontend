<!-- =========================================================================================
  File Name: ChartjsComponentBubbleChart.vue
  Description: Chartjs component - Bubble Chart
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Wilber Galindez
  Author URL: https://www.wilber.dev/
========================================================================================== -->

<script>
import { Bubble } from 'vue-chartjs'

export default {
  extends: Bubble,
  props: {
    data: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>
