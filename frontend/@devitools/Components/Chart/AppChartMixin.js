import Chart from 'chart.js'

export default {
  /**
   */
  props: {
    data: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    container: {
      type: [Object, String],
      default () {
        return {}
      }
    }
  },
  /**
   */
  computed: {
    /**
     * @return {*}
     */
    config () {
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
        },
        animation: {
          onComplete: () => this.$emit('chart:ready')
        },
        ...this.options
      }
    }
  },
  methods: {
    /**
     * @param data
     * @return {*}
     */
    updateChart (data) {
      if (this.$chart) {
        this.$chart.data.datasets = data.datasets
        if (data.labels) {
          this.$chart.data.labels = data.labels
        }
        this.$chart.update(this.config)
        return this.$chart
      }
    },
    createChart (options = {}) {
      const ctx = this.$refs.chart.getContext('2d')
      this.$chart = new Chart(ctx, {
        type: this.$options.type,
        data: this.data,
        options: { ...this.config, ...options }
      })
      return this.$chart
    }
  },
  watch: {
    data (data) {
      this.updateChart(data)
    }
  }
}
