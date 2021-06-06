<template>
  <QExpansionItem
    v-if="entry.children && entry.children.length"
    :key="entry.uuid"
    :icon="entry.icon"
    :label="entry.label"
    :value="expanded"
    header-class="text-grey-8"
  >
    <template v-for="(kid, key) in entry.children">
      <DashboardDrawerEntry
        :key="key"
        :entry="kid"
        @active="expanded = true"
        @popup="$emit('popup', $event)"
      />
    </template>
  </QExpansionItem>
  <QItem
    v-else
    v-ripple
    clickable
    :active="isActive"
    :class="{ 'resource-not-implemented': !entry.path, 'resource-separated': entry.separated }"
    class="DashboardDrawerEntry__item"
    @click="openEntry(entry)"
  >
    <QItemSection
      v-if="entry.icon"
      avatar
    >
      <QIcon
        :name="entry.icon"
        color="grey-8"
      />
    </QItemSection>
    <QItemSection>
      {{ entry.label }}
    </QItemSection>
    <QItemSection
      side
      style="padding: 0"
    >
      <QBtn
        v-if="entry.filters && entry.filters.length"
        icon="more_vert"
        flat
        dense
        round
        size="0.9rem"
        color="grey-8"
        @click.prevent="openMenu($event, entry)"
      >
        <QMenu
          transition-show="jump-down"
          transition-hide="jump-up"
          auto-close
        >
          <QList style="min-width: 100px">
            <QItem
              v-close-popup
              clickable
              @click.prevent="openInPopup($event, entry)"
            >
              <QItemSection
                avatar
                class="q-pr-sm"
                style="min-width: auto;"
              >
                <QIcon
                  name="open_in_new"
                  color="grey-default"
                />
              </QItemSection>
              <QSeparator vertical />
              <QItemSection class="q-pl-sm">
                {{ $t('pages.dashboard.index.open-in-popup') }}
              </QItemSection>
            </QItem>

            <template v-for="(filter, index) in entry.filters">
              <QItem
                :key="index"
                v-close-popup
                clickable
                @click="openEntry(entry, filter.query)"
              >
                <QItemSection
                  v-if="filter.icon"
                  avatar
                  class="q-pr-sm"
                  style="min-width: auto;"
                >
                  <QIcon
                    :name="filter.icon"
                    color="grey-default"
                  />
                </QItemSection>
                <QSeparator vertical />
                <QItemSection class="q-pl-sm">
                  {{ filter.label }}
                </QItemSection>
              </QItem>
            </template>
          </QList>
        </QMenu>
      </QBtn>

      <QBtn
        v-else
        class="DashboardDrawerEntry__item__open_in_new"
        icon="open_in_new"
        flat
        dense
        round
        size="0.7rem"
        color="grey-5"
        @click.prevent="openInPopup($event, entry)"
      />
    </QItemSection>
  </QItem>
</template>

<script type="text/javascript">
import { QBtn, QExpansionItem, QIcon, QItem, QItemSection, QList, QMenu, QSeparator } from 'quasar'

export default {
  /**
   */
  name: 'DashboardDrawerEntry',
  /**
   */
  components: {
    QExpansionItem,
    QItem,
    QItemSection,
    QIcon,
    QBtn,
    QMenu,
    QList,
    QSeparator
  },
  /**
   */
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  /**
   */
  data: () => ({
    expanded: process.env.VUE_APP_SIDEBAR_EXPANDED === 'true'
  }),
  /**
   */
  computed: {
    /**
     * @returns {boolean}
     */
    isActive () {
      const route = String(this.$route.path)
      let to = this.entry.path
      if (typeof to === 'object') {
        to = to.path
      }
      return route.includes(`${to}/`) || route === to
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
  },
  /**
   */
  methods: {
    /**
     * @param {Object} entry
     * @param {Record<string,unknown>} query
     */
    openEntry (entry, query = undefined) {
      const to = entry.path
      if (typeof to === 'string') {
        this.$browse({ path: to, query: typeof query === 'function' ? query() : query })
        return
      }
      if (typeof to === 'object' && typeof to.query === 'function') {
        to.query = to.query.call(this)
      }
      this.$browse(entry.path)
    },
    /**
     * @param {Event} $event
     * @param {Object} entry
     */
    openInPopup ($event, entry) {
      $event.stopPropagation()
      $event.preventDefault()
      this.$emit('popup', entry.path)
    },
    /**
     * @param {Event} $event
     * @param {Object} entry
     */
    openMenu ($event, entry) {
      $event.stopPropagation()
      $event.preventDefault()
    }
  }
}
</script>

<style lang="stylus">
.DashboardDrawerEntry__item {
  .DashboardDrawerEntry__item__open_in_new {
    transition: transform 0.3s;
    transform: scale(0.5);
  }
  &:hover {
    .DashboardDrawerEntry__item__open_in_new {
      color: #616161 !important;
      transform: scale(1);
      -moz-osx-font-smoothing: grayscale;
      backface-visibility: hidden;
    }
  }
}
</style>
