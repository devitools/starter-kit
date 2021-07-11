<template>
  <div class="AppFilePreview">
    <div class="flex q-pa-sm justify-end">
      <QBtn
        flat
        round
        icon="close"
        @click="$emit('close')"
      />
    </div>

    <article
      v-show="!ready"
      class="flex justify-center items-center"
    >
      <QSpinner
        color="white"
        size="100px"
        :thickness="3"
      />
    </article>

    <iframe
      v-show="ready"
      :src="value"
      @load="ready = true"
    />
  </div>
</template>

<script>
import { QBtn, QSpinner } from 'quasar'

export default {
  /**
   */
  name: 'AppFilePreview',
  /**
   */
  components: {
    QBtn,
    QSpinner
  },
  /**
   */
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data: () => ({
    ready: false
  })
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
.AppFilePreview {
  background: #ffffff;
  min-width: 90vw;
  padding: 4px;

  iframe, article {
    width: 100%;
    height: 80vh;
    background: #9a9a9a;
    border: 1px solid #9a9a9a;
    border-radius: 4px;
  }

  iframe {
    margin-bottom: -6px;
  }
}
</style>
