<template>
  <div
    class="AppUploader AppFile"
    ref="container"
  >
    <div class="actions">
      <input
        type="file"
        ref="file"
        :accept="accept"
        style="display:none"
        @change="handleFilesAsync"
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
        @click="$emit('input', empty)"
        round
        flat
      />

      <div class="content">
        {{ content }}
      </div>
    </div>

    <div class="progress-bar">
      <div
        class="progress"
        ref="progress"
      />
    </div>
  </div>
</template>

<script>
import File from './Uploader'
import { QBtn } from 'quasar'

export default {
  /**
   */
  name: 'AppFileAsync',
  /**
   */
  data: () => {
    return {
      file: undefined
    }
  },
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
    empty: {
      type: [Number, String],
      default: ''
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    filename: {
      type: Function,
      default: undefined
    }
  },
  /**
   */
  computed: {
    /**
     * @return {string}
     */
    content () {
      return String(this.value).split('/').pop()
    }
  },
  /**
   */
  methods: {
    handleFilesAsync () {
      this.file = this.$refs.file.files[0]
      this.$emit('file-selected', this.file)
    }
  }
}
</script>

<style lang="stylus">
.AppFile {
  > .actions {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;

    > .content {
      border: 1px solid #dddddd;
      border-radius: 4px;
      padding: 7px 10px 0 10px;
      flex: 1;
      color: #737373;
      font-size: 0.8rem;
      height: 35px;
    }
  }
}
</style>
