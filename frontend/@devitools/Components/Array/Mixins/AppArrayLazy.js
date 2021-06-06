/**
 * @mixin {AppArrayLazy}
 */
export default {
  /**
   */
  data: () => ({
    editable: {}
  }),
  /**
   */
  methods: {
    /**
     * @param {number|string} id
     * @param {boolean} editable
     */
    setEditable (id, editable) {
      this.$set(this.editable, id, editable)
    },
    /**
     * @param {Record<string, unknown>} row
     */
    dropEditable (row) {
      try {
        const id = row.__uuid
        this.$delete(this.editable, id)
      } catch (e) {
        // silent is gold
      }
    },
    /**
     * @param {number} index
     * @param {*} record
     */
    updateItem (index, record) {
      const records = [...this.records]
      records[index] = record
      this.updateValue(index, records)
    },
    /**
     * @param {number} index
     */
    removeItem (index) {
      const records = [...this.records]
      this.dropEditable(records[index])
      records.splice(index, 1)
      this.$emit('input', records)
    },
    /**
     * @param {number} index
     */
    cancelItem (index) {
      const records = [...this.records]
      this.dropEditable(records[index])
      records.splice(index, 1)
      this.records = records
    }
  }
}
