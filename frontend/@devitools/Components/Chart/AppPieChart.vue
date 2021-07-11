<template src="./appChart.html" />

<script type="text/javascript">
import chartMixin from './AppChartMixin'

export default {
  /**
   */
  name: 'AppPieChart',
  /**
   */
  type: 'pie',
  /**
   */
  mixins: [chartMixin],
  /**
   */
  mounted () {
    this.createChart()
  }
}
</script>
