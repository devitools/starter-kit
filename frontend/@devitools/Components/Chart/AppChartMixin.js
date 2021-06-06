import Chart from 'chart.js'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default () {
        return this.initOptions()
      }
    },
    container: {
      type: [Object, String],
      default () {
        return {}
      }
    }
  },
  methods: {
    initOptions () {
      return {
        responsive: true,
        lineTension: 1,
        scales: {
          yAxes: [{
            ticks: {
              padding: 25,
              beginAtZero: true
            }
          }]
        }
      }
    },
    updateChart (data) {
      if (this.$chart) {
        this.$chart.data.datasets = data.datasets
        if (data.labels) {
          this.$chart.data.labels = data.labels
        }
        this.$chart.update()
        return this.$chart
      }
    },
    createChart (options = {}) {
      const ctx = this.$refs.chart.getContext('2d')
      this.$chart = new Chart(ctx, { type: this.$options.type, data: this.data, options: { ...this.options, ...options } })
      return this.$chart
    }
  },
  watch: {
    data (data) {
      this.updateChart(data)
    }
  }
}
