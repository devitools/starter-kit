<template>
  <QTimeline
    class="AppTimeline"
    :color="color"
  >
    <QTimelineEntry
      v-for="(entry, index) in entries"
      :key="index"
      v-bind="entry"
    >
      <template v-if="entry.html">
        <div v-html="entry.html" />
      </template>
    </QTimelineEntry>
  </QTimeline>
</template>

<script>
import { QTimeline, QTimelineEntry } from 'quasar'

export default {
  /**
   */
  name: 'AppTimeline',
  /**
   */
  components: { QTimeline, QTimelineEntry },
  /**
   */
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    map: {
      type: Function,
      default: (row) => row
    },
    color: {
      type: String,
      default: 'accent'
    }
  },
  /**
   */
  computed: {
    entries () {
      return this.value.map(this.map.bind(this))
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
.AppTimeline {
  padding: 10px 20px 0 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin: 5px 0;
}
</style>
