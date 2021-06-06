<template>
  <div class="SchemaFormValidationPanel">
    <div
      v-if="hasErrors"
      class="SchemaFormValidationPanel__indicator bg-warning shadow-2"
    >
      <QBtn
        icon="priority_high"
        flat
        round
        @click="showErrors = true"
      />
    </div>
    <QDialog
      v-model="showErrors"
      full-height
      maximized
      position="right"
    >
      <div class="SchemaFormValidationPanelMessages bg-white flex column justify-between">
        <div class="SchemaFormValidationPanelMessages__header q-pa-md">
          <div class="flex justify-between items-center">
            <span>{{ $t('agnostic.components.validation.title') }}</span>
            <QBtn
              icon="close"
              flat
              round
              @click="showErrors = false"
            />
          </div>
        </div>

        <div class="q-pa-md col-grow">
          <div
            v-for="(error, key) in errors"
            :key="key"
            class="q-mb-sm"
          >
            <strong>&bullet; {{ label(key, error) }}</strong>
            <div class="q-pl-sm">{{ message(key, error) }}</div>
          </div>
        </div>

        <div class="q-pl-md q-pr-md q-pt-sm q-pb-md">
          <SchemaButtons v-bind="operations" />
        </div>
      </div>
    </QDialog>
  </div>
</template>

<script>
import { QBtn, QDialog } from 'quasar'
import { is } from '../../../../Util/general'
import SchemaButtons from '../../Buttons/SchemaButtons'
import { replacement } from '../../../../Util/string'

export default {
  /**
   */
  name: 'SchemaFormValidationPanel',
  /**
   */
  components: {
    QBtn,
    QDialog,
    SchemaButtons
  },
  /**
   */
  props: {
    domain: {
      type: String,
      required: true
    },
    errors: {
      type: Object,
      default: undefined
    },
    operations: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   */
  data: () => ({
    showErrors: false,
    hasErrors: false
  }),
  /**
   */
  watch: {
    /**
     */
    errors: {
      immediate: true,
      deep: true,
      handler () {
        this.hasErrors = is(this.errors)
      }
    },
    /**
     */
    hasErrors (value) {
      if (value) {
        return
      }
      this.showErrors = false
    }
  },
  /**
   */
  methods: {
    /**
     * @param {string} key
     * @param {*} error
     * @return {*}
     */
    label (key, error) {
      const paths = [
        `domains.${this.domain}.fields.${key}.label`,
        `domains.${this.domain}.fields.${key}`
      ]
      return this.$lang(paths, error?.label ?? key)
    },
    /**
     * @param {string} key
     * @param error
     */
    message (key, error) {
      if (!Array.isArray(error)) {
        return error.validation
      }
      const messages = error.map((item) => {
        const { domain, type } = item
        const validation = type
        const replaces = Object.assign(item, { domain, key, validation })
        const preference = `domains.${domain}.validations.${key}.${validation}`
        const paths = [
          preference,
          `domains.${domain}.validation.${key}.${validation}`,
          `domains.${domain}.validations.${key}.${validation}`,
          `domains.${this.domain}.validation.${key}.${validation}`,
          `domains.${this.domain}.validations.${key}.${validation}`,
          `validation.${validation}`
        ]
        return replacement(this.$lang(paths, preference), replaces) || preference
      })
      return messages.join('/')
    }
  }
}
</script>

<style lang="stylus">
.SchemaFormValidationPanel {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1000;

  > .SchemaFormValidationPanel__indicator {
    border-radius: 0 0 0 60px;
    padding: 5px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    animation: toggle-pulse 2s infinite;
  }
}

.SchemaFormValidationPanelMessages {
  width: 320px !important;

  .SchemaFormValidationPanelMessages__header {
    font-size: 1.2rem;
    font-weight: bold;
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: #ddd;
  }
}
</style>
