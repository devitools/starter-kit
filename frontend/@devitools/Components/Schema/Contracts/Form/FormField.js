/**
 * @typedef {Object} FormField
 */
export default {
  /**
   */
  methods: {
    /**
     * @see SchemaFormFieldError
     *
     * @param {string} field
     * @param {{validation: string, parameters: Record<string, unknown>}} error
     */
    setFieldError (field, error) {
      if (!error) {
        this.errors[field] = ''
        return
      }

      this.$set(this.errors, field, error)
    }
  }
}
