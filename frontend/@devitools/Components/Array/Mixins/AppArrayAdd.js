import { uuid } from '../../../Util/general'

/**
 * @mixin {AppArrayAdd}
 */
export default {
  /**
   */
  methods: {
    /**
     */
    newest () {
      const newest = { __new: true, __uuid: uuid() }
      if (this.useUuid) {
        newest[this.primaryKey] = uuid()
      }
      const reduce = (accumulator, field) => {
        accumulator[field.$key] = field.attrs.value
        return accumulator
      }
      return Object.values(this.fields()).reduce(reduce, newest)
    },
    /**
     */
    addItem () {
      const newest = this.newest()

      const records = [...this.records, newest]
      this.records = records

      this.$nextTick(() => {
        let ref = this.$refs[`body-${records.length - 1}`]
        if (!ref) {
          return
        }
        if (Array.isArray(ref)) {
          ref = ref[0]
        }
        if (ref) {
          ref.editRow()
        }
      })
    }
  }
}
