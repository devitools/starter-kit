<template>
  <QBtn
    :class="classNames"
    :color="color"
    v-bind="bind"
    @click="click"
  />
</template>

<script>
import { QBtn } from 'quasar'

export default {
  /**
   */
  name: 'AppButton',
  /**
   */
  components: {
    QBtn
  },
  /**
   */
  props: {
    /**
     */
    click: {
      type: Function,
      default: () => undefined
    },
    /**
     */
    classes: {
      type: [String, Array],
      default: () => undefined
    },
    /**
     */
    color: {
      type: String,
      default: 'primary'
    },
    /**
     */
    fullwidth: {
      type: Boolean,
      default: true
    },
    /**
     */
    link: {
      type: Boolean,
      default: true
    }
  },
  /**
   */
  computed: {
    /**
     * @return {*}
     */
    bind () {
      const flat = this.link
      const disable = this.$attrs['readonly']
      return { flat, disable, ...this.$attrs, ...this.$props }
    },
    /**
     * @returns {Array}
     */
    classNames () {
      const classNames = ['AppButton']
      if (this.link) {
        classNames.push('AppButton--link')
        return classNames
      }
      if (this.fullwidth) {
        classNames.push('full-width')
      }
      if (typeof this.classes === 'string') {
        classNames.push(this.classes)
        return classNames
      }
      if (Array.isArray(this.classes)) {
        classNames.push(...this.classes)
      }
      return classNames
    }
  }
}
</script>

<style scoped>
.AppButton {
  margin-top: 21px;
  min-height: 39px;
}

.AppButton--link {
  text-decoration: underline;
  text-transform: none;
}
</style>
