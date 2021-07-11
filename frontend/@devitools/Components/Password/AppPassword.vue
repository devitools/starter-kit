<template>
  <QInput
    v-bind="bind"
    v-on="$listeners"
    :type="visible ? 'text' : 'password'"
  >
    <template
      v-slot:prepend
      v-if="generator && enabled"
    >
      <QIcon
        name="vpn_key"
        class="cursor-pointer"
        @click="generate"
      >
        <AppTooltip>{{ generatorTooltip }}</AppTooltip>
      </QIcon>
    </template>
    <template v-slot:append>
      <QIcon
        :name="visible ? 'no_encryption' : 'lock'"
        class="cursor-pointer"
        @click="visible = !visible"
      >
        <AppTooltip>{{ visibleTooltip }}</AppTooltip>
      </QIcon>
    </template>
  </QInput>
</template>

<script>
import { QInput, QIcon, copyToClipboard } from 'quasar'
import AppTooltip from '../Tooltip/AppTooltip'

import { toast } from '../../message'
import { replacement } from '../../Util/string'
import { generatePassword } from '../../Util/general'

export default {
  /**
   */
  name: 'AppPassword',
  /**
   */
  components: { QInput, QIcon, AppTooltip },
  /**
   */
  props: {
    value: {
      type: [String],
      default: null
    },
    generator: {
      type: Boolean,
      default: true
    },
    length: {
      type: Number,
      default: 8
    },
    generatorTitle: {
      type: String,
      default: undefined
    },
    visibleTitle: {
      type: String,
      default: undefined
    },
    disable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  /**
   */
  computed: {
    bind () {
      return { ...this.$attrs, ...this.$props }
    },
    generatorTooltip () {
      const template = this.generatorTitle || this.$lang('agnostic.components.password.generator.tooltip')
      return replacement(template, { length: this.length })
    },
    visibleTooltip () {
      return this.visibleTitle || this.$lang('agnostic.components.password.visible.tooltip')
    },
    enabled () {
      return !this.readonly && !this.disable
    }
  },
  /**
   */
  data: () => ({
    visible: false
  }),
  /**
   */
  methods: {
    /**
     */
    generate () {
      this.visible = true
      const password = generatePassword(this.length)
      copyToClipboard(password)
        .then(() => {
          toast(this.$lang('agnostic.components.password.copied'), { caption: password })
          this.$emit('generate', password)
          this.$emit('input', password)
        })
    }
  }
}
</script>
