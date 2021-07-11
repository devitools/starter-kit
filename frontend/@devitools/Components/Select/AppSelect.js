import { QSelect } from 'quasar'
import { isDeepEqual } from 'quasar/src/utils/is'

/**
 */
export default {
  /**
   */
  extends: QSelect,
  /**
   */
  name: 'AppSelect',
  /**
   */
  methods: {
    /**
     * @param opt
     * @param keepOpen
     */
    toggleOption (opt, keepOpen) {
      if (this.editable !== true || opt === void 0 || this.isOptionDisabled(opt) === true) {
        return
      }

      const optValue = this.getOptionValue(opt)

      this.$emit('select', opt)

      if (this.multiple !== true) {
        this.$refs.target !== void 0 && this.$refs.target.focus()

        if (keepOpen !== true) {
          this.updateInputValue(
            this.fillInput === true ? this.getOptionLabel(opt) : '',
            true,
            true
          )

          this.hidePopup()
        }

        if (isDeepEqual(this.getOptionValue(this.innerValue), optValue) !== true) {
          this.$emit('input', this.emitValue === true ? optValue : opt)
        }
        return
      }

      (this.hasDialog !== true || this.dialogFieldFocused === true) && this.__focus()

      this.__selectInputText()

      if (this.innerValue.length === 0) {
        const val = this.emitValue === true ? optValue : opt
        this.$emit('add', { index: 0, value: val })
        this.$emit('input', this.multiple === true ? [val] : val)
        return
      }

      const
        model = this.value.slice(),
        index = this.innerOptionsValue.findIndex(v => isDeepEqual(v, optValue))

      if (index > -1) {
        this.$emit('remove', { index, value: model.splice(index, 1) })
      } else {
        if (this.maxValues !== void 0 && model.length >= this.maxValues) {
          return
        }

        const val = this.emitValue === true ? optValue : opt

        this.$emit('add', { index: model.length, value: val })
        model.push(val)
      }

      this.$emit('input', model)
    }
  }
}
