/**
 * @mixin {FormRecord}
 */
export default {
  /**
   */
  methods: {
    /**
     */
    renderRecord () {
      if (!this.components) {
        return
      }

      const reduceRecord = (record, field) => {
        const key = field.$key
        let value = field.attrs.value
        if (this.value && (typeof this.value === 'object') && (this.value.hasOwnProperty(key))) {
          value = this.value[key]
        }
        record[key] = value
        return record
      }
      this.record = Object.values(this.components).reduce(reduceRecord, {})

      Object.values(this.components).forEach((field) => {
        this.$watch(`record.${field.$key}`, function () {
          if (this.fetching) {
            return
          }
          if (field.$hasValidation) {
            this.$v.record[field.$key].$touch()
          }
        })
      })
    },
    /**
     * @returns {*}
     */
    getRecord () {
      let avoids = []
      if (typeof this.avoids === 'function') {
        avoids = this.avoids()
      }

      const reduce = (accumulator, [key, value]) => {
        if (avoids.includes(key)) {
          return accumulator
        }

        accumulator = this.$util.set(accumulator, key, value)
        return accumulator
      }
      return Object.entries(this.record)
        .reduce(reduce, {})
    }
  }
}
