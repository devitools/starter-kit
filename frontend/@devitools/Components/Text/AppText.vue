<template>
  <div
    class="AppText"
    :class="classNames"
    :style="styles"
  >
    <template v-if="html">
      <div v-html="value" />
    </template>
    <template v-else>
      <template v-if="icon">
        <QIcon
          :name="icon"
          size="1.8rem"
        />
      </template>
      {{ value }}
    </template>
  </div>
</template>

<script>
import { QIcon } from 'quasar'

export default {
  /**
  */
  name: 'AppText',
  /**
  */
  components: { QIcon },
  /**
  */
  props: {
    value: {
      type: [String, Number, undefined],
      default: ''
    },
    classNames: {
      type: [String, Object, Array],
      default: 'text-default'
    },
    styles: {
      type: [String, Object, Array],
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    html: {
      type: Boolean,
      default: false
    }
  }
} </script>
