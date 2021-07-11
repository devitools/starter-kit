<template>
  <div>
    <router-view />
    <div
      class="fullscreen-bg"
      :style="{ 'background-image': `url('${$static('/auth/background.jpg')}')` }"
    />
  </div>
</template>

<script lang="js">
import $emporium from '@devitools/emporium'

export default {
  name: 'AuthLayout',
  /**
   */
  mounted () {
    window.addEventListener('beforeunload', this.beforeUnload)
  },
  /**
   */
  destroyed () {
    window.removeEventListener('beforeunload', this.beforeUnload)
  },
  /**
   */
  methods: {
    /**
     */
    beforeUnload ($event) {
      if (!$emporium.state.modified) {
        return
      }
      $event.returnValue = this.$lang('agnostic.modified')
    }
  }
}
</script>

<style
  lang="stylus"
  scoped
>
.fullscreen-bg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: -100;
  background-size: cover;
  background-position: center;
}
</style>
