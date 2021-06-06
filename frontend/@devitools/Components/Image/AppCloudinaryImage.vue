<template>
  <div
    class="AppUploader AppCloudinaryImage"
    ref="container"
  >
    <div
      class="preview"
      :style="{ backgroundImage: `url('${value}')` }"
    />

    <input
      type="file"
      ref="file"
      accept="image/*"
      style="display:none"
      @change="handleFiles"
    >

    <QBtn
      :disabled="locked"
      @click="onClick"
      color="primary"
      icon="attach_file"
      round
      flat
    />

    <QBtn
      :disabled="locked"
      color="negative"
      icon="delete"
      @click="$emit('input', undefined)"
      round
      flat
    />

    <div class="progress-bar">
      <div
        class="progress"
        ref="progress"
      />
    </div>
  </div>
</template>

<script>
import File from '../File/Uploader'
import { QBtn } from 'quasar'

export default {
  /**
   */
  name: 'AppCloudinaryImage',
  /**
   */
  mixins: [File],
  /**
   */
  components: {
    QBtn
  },
  /**
   */
  props: {
    uploadURL: {
      type: String,
      default: ''
    },
    unsignedUploadPreset: {
      type: String,
      default: ''
    }
  },
  /**
   */
  methods: {
    /**
     * @param {File} file
     */
    startFileUpload (file) {
      this.agent.open('POST', this.uploadURL, true)
      this.agent.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

      const formData = new FormData()
      formData.append('upload_preset', this.unsignedUploadPreset)
      formData.append('tags', 'browser_upload') // Optional - add tag for image admin in Cloudinary
      formData.append('file', file)
      this.agent.send(formData)
    },
    /**
     * @param {Object} response
     */
    finishFileUpload (response) {
      const { secure_url: value } = response
      return value
    }
  }
}
</script>

<style lang="stylus">
.AppCloudinaryImage {

  .preview {
    background-color #a8a8a8
    height 203px
    background-size contain
    background-repeat no-repeat
    background-position center
    margin 0 0 10px 0
  }
}
</style>
