<!-- =========================================================================================
  File Name: ChartjsComponentRadarChart.vue
  Description: Chartjs component - Radar Chart
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Wilber Galindez
  Author URL: https://www.wilber.dev/
========================================================================================== -->


<script>
import { Radar } from 'vue-chartjs'

export default {
  extends: Radar,
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
