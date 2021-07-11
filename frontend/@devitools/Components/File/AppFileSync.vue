<template>
  <QFile
    ref="file"
    v-bind="bind"
    :value="input"
    :accept="acceptable"
    :multiple="multiple"
    :max-files="maxFiles"
    :max-file-size="maxFileSize"
    :max-total-size="maxTotalSize"
    @input="updateValue"
  >
    <template
      #prepend
      v-if="!readonly"
    >
      <QBtn
        round
        dense
        flat
        icon="attach_file"
        @click="pickFiles"
      >
        <AppTooltip>{{ $lang('agnostic.components.file.upload') }}</AppTooltip>
      </QBtn>
    </template>
    <template
      #append
      v-if="typeof value === 'string' && value"
    >
      <div class="q-mr-sm">
        <QBtn
          round
          dense
          flat
          icon="wysiwyg"
          @click="preview"
        >
          <AppTooltip>{{ $lang('agnostic.components.file.preview') }}</AppTooltip>
        </QBtn>
        <QBtn
          round
          dense
          flat
          icon="cloud_download"
          @click="download"
        >
          <AppTooltip>{{ $lang('agnostic.components.file.download') }}</AppTooltip>
        </QBtn>
        <QDialog v-model="previewing">
          <AppFilePreview
            :value="previewURL"
            @close="previewing = false"
          />
        </QDialog>
      </div>
    </template>
  </QFile>
</template>

<script>
import { QBtn, QDialog, QFile } from 'quasar'
import AppTooltip from '../Tooltip/AppTooltip'
import AppFilePreview from './AppFilePreview'

export default {
  /**
   */
  name: 'AppFileSync',
  /**
   */
  components: {
    AppFilePreview,
    QBtn,
    QDialog,
    QFile,
    AppTooltip
  },
  /**
   */
  props: {
    accept: {
      type: [String, Array],
      default: () => ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    maxFiles: {
      type: [Number, String],
      default: 1
    },
    maxFileSize: {
      type: [Number, String],
      default: undefined
    },
    maxTotalSize: {
      type: [Number, String],
      default: undefined
    },
    value: {
      type: [File, FileList, Array, Object, String],
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    downloadName: {
      type: String,
      default: ''
    },
    downloadFile: {
      type: Function,
      required: true
    }
  },
  /**
   */
  computed: {
    /**
     * @return {*}
     */
    bind () {
      let label = ''
      if (!this.value && !this.readonly) {
        label = this.placeholder
      }
      return {
        ...this.$attrs,
        ...this.$props,
        label
      }
    },
    /**
     * @return {string|File|undefined}
     */
    input () {
      if (typeof this.value !== 'string') {
        return this.value
      }
      if (!this.value) {
        return undefined
      }
      if (this.downloadName) {
        const extension = this.value.split('.').pop()
        return new File(['empty'], `${this.$lang(this.downloadName)}.${extension}`)
      }
      const pieces = this.value.split('/')
      const file = pieces.pop()
      return new File(['empty'], file)
    },
    /**
     * @return {string}
     */
    acceptable () {
      if (Array.isArray(this.accept)) {
        return this.accept.join(',')
      }
      if (typeof this.accept === 'string') {
        return this.accept
      }
      return ''
    }
  },
  /**
   */
  data: () => ({
    model: null,
    previewing: false,
    previewURL: ''
  }),
  /**
   */
  methods: {
    /**
     * @param {File} $event
     */
    updateValue ($event) {
      if ($event === undefined) {
        this.$emit('input', this.model)
        return
      }
      this.model = $event
      this.$emit('input', $event)
    },
    /**
     */
    pickFiles () {
      this.$refs.file.pickFiles()
    },
    /**
     * @param {Event} $event
     */
    download ($event) {
      $event.stopPropagation()
      $event.preventDefault()
      // noinspection JSCheckFunctionSignatures
      this.downloadFile(this.value, this.model)
    },
    /**
     * @param {Event} $event
     */
    preview ($event) {
      $event.stopPropagation()
      $event.preventDefault()
      this.previewing = true
      this.previewURL = this.$static(this.value, true)
    }
  }
}
</script>
