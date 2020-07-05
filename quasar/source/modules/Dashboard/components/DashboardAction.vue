<template>
  <QExpansionItem
    v-if="action.children && action.children.length"
    :key="action.uuid"
    :icon="action.icon"
    :label="action.label"
    :value="expanded"
  >
    <template v-for="(kid, key) in action.children">
      <DashboardAction
        :key="key"
        :action="kid"
        @active="expanded = true"
        @popup="$emit('popup', $event)"
      />
    </template>
  </QExpansionItem>
  <QItem
    v-else
    @click="openAction(action)"
    clickable
    v-ripple
    :active="isActive"
    :class="{ 'resource-not-implemented': !action.path, 'resource-separated': action.separated }"
  >
    <QItemSection
      v-if="action.icon"
      avatar
    >
      <QIcon :name="action.icon" />
    </QItemSection>
    <QItemSection>
      {{ action.label }}
    </QItemSection>
    <QItemSection
      side
      style="padding: 0"
      class="open-in-popup"
    >
      <QBtn
        icon="open_in_new"
        flat
        dense
        round
        size="0.6rem"
        @click="openInPopup($event, action)"
      />
    </QItemSection>
  </QItem>
</template>

<script type="text/javascript">
// noinspection ES6CheckImport
import {
  QExpansionItem,
  QItem,
  QItemSection,
  QIcon,
  QBtn
} from 'quasar'

export default {
  /**
   */
  name: 'DashboardAction',
  /**
   */
  components: {
    QExpansionItem,
    QItem,
    QItemSection,
    QIcon,
    QBtn
  },
  /**
   */
  props: {
    action: {
      type: Object,
      required: true
    }
  },
  /**
   */
  computed: {
    /**
     * @returns {boolean}
     */
    isActive () {
      const route = this.$route.path
      const path = this.action.path
      return route.includes(`${this.action.path}/`) || route === path
    }
  },
  /**
   */
  data: () => ({
    expanded: process.env.VUE_APP_SIDEBAR_EXPANDED === 'true'
  }),
  /**
   */
  methods: {
    /**
     * @param {Object} action
     */
    openAction (action) {
      const path = action.path.split('?').shift()
      this.$router.push({ path })
    },
    /**
     * @param {Event} $event
     * @param {Object} action
     */
    openInPopup ($event, action) {
      $event.stopPropagation()
      $event.preventDefault()
      this.$emit('popup', action.path)
    }
  },
  /**
   */
  watch: {
    isActive: {
      immediate: true,
      handler (isActive) {
        if (!isActive) {
          return
        }
        this.$emit('active', true)
      }
    }
  }
}
</script>

<style scoped>

</style>
