<template src="./appChart.html" />

<script type="text/javascript">
import chartMixin from './AppChartMixin'

export default {
  /**
   */
  name: 'AppBarHorizontalChart',
  /**
   */
  type: 'horizontalBar',
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
