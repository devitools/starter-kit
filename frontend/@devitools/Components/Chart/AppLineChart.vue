<template src="./appChart.html" />

<script type="text/javascript">
import chartMixin from './AppChartMixin'

export default {
  /**
   */
  name: 'AppLineChart',
  /**
   */
  type: 'line',
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
