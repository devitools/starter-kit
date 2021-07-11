<template src="./appChart.html" />

<script type="text/javascript">
import chartMixin from './AppChartMixin'

export default {
  /**
   */
  name: 'AppBarChart',
  /**
   */
  type: 'bar',
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
