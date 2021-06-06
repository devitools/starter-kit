<template>
  <QBtnDropdown
    stretch
    flat
    content-class="DashboardLayout__dropdown_menu"
  >
    <template #label>
      <div class="DashboardLayout__user q-pt-md q-pl-sm q-pr-md">
        <div>{{ name }}</div>
        <small>{{ username }}</small>
      </div>
      <QAvatar
        class="DashboardLayout__avatar"
        color="white"
        text-color="primary"
      >
        <template v-if="photo">
          <div
            class="avatar-image"
            :style="{ 'background-image' : `url('${photo}')` }"
          />
        </template>
        <template v-else>
          {{ letter }}
        </template>
      </QAvatar>
    </template>
    <QList>
      <QItem
        v-ripple
        clickable
        :to="accountPath"
      >
        <QItemSection>
          <QItemLabel>{{ $lang('app.menu.profile.label') }}</QItemLabel>
          <QItemLabel caption>
            {{ $lang('app.menu.profile.caption') }}
          </QItemLabel>
        </QItemSection>
      </QItem>

      <QItem
        v-ripple
        clickable
        :to="notificationPath"
      >
        <QItemSection>
          <QItemLabel>{{ $lang('pages.dashboard.notification.label') }}</QItemLabel>
          <QItemLabel caption>
            {{ $lang('pages.dashboard.notification.caption') }}
          </QItemLabel>
        </QItemSection>
      </QItem>

      <QItem
        v-ripple
        clickable
        @click="exit"
      >
        <QItemSection>
          <QItemLabel>{{ $lang('app.menu.logout.label') }}</QItemLabel>
          <QItemLabel caption>
            {{ $lang('app.menu.logout.caption') }}
          </QItemLabel>
        </QItemSection>
      </QItem>

      <QItem v-if="$dev">
        <QItemSection>
          <QToggle
            v-model="debugging"
            label="debugging"
            color="red"
          />
        </QItemSection>
      </QItem>

      <QItem v-if="$dev">
        <QItemSection>
          <QToggle
            v-model="profiling"
            label="profiling"
            color="red"
          />
        </QItemSection>
      </QItem>

      <QItem v-if="$dev">
        <QItemSection>
          <QToggle
            v-model="filling"
            label="filling"
            color="red"
          />
        </QItemSection>
      </QItem>

      <QItem v-if="$dev">
        <QItemSection>
          <QToggle
            v-model="purging"
            label="purging"
            color="red"
          />
        </QItemSection>
      </QItem>
    </QList>
  </QBtnDropdown>
</template>

<script>
import { QAvatar, QBtnDropdown, QItem, QItemLabel, QItemSection, QList, QToggle } from 'quasar'
import $emporium from '@devitools/emporium'

import Dialog from '@devitools/Components/Schema/Contracts/Dialog'
import DashboardSession from 'source/modules/Dashboard/DashboardSession'

export default {
  /**
   */
  name: 'DashboardDropdown',
  /**
   */
  components: {
    QBtnDropdown,
    QAvatar,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QToggle
  },
  /**
   */
  mixins: [Dialog, DashboardSession],
  /**
   */
  data: () => ({
    debugging: false,
    profiling: false,
    filling: false,
    purging: false
  }),
  /**
   */
  computed: {
    /**
     * @return {string}
     */
    accountPath () {
      return '/dashboard/settings/account'
    },
    /**
     * @return {string}
     */
    notificationPath () {
      return '/dashboard/admin/notification'
    },
    /**
     * @returns {string}
     */
    name () {
      const name = this.$util.get(this.$store.getters['auth/getUser'], 'name', '')
      const names = name.split(' ')
      const info = [names.shift(), names.pop()]
      return info.join(' ')
    },
    /**
     * @returns {string}
     */
    username () {
      return this.$util.get(this.$store.getters['auth/getUser'], 'username')
    },
    /**
     * @return {string}
     */
    photo () {
      const photo = this.$util.get(this.$store.getters['auth/getUser'], 'photo')
      if (!photo) {
        return ''
      }
      const ttl = new Date().getTime().toString(32)
      return this.$static(`${photo}?ttl=${ttl}`, true)
    },
    /**
     * @returns {string}
     */
    letter () {
      const username = this.$util.get(this.$store.getters['auth/getUser'], 'name')
      if (!username) {
        return ''
      }
      return String(username).substring(0, 1).toLocaleUpperCase()
    }
  },
  /**
   */
  created () {
    if (!this.$dev) {
      return
    }

    this.debugging = $emporium.state.debugging
    this.$watch('debugging', (value) => {
      $emporium.commit('updateDebugging', value)
    })

    this.profiling = $emporium.state.profiling
    this.$watch('profiling', (value) => {
      $emporium.commit('updateProfiling', value)
    })

    this.filling = $emporium.state.filling
    this.$watch('filling', (value) => {
      $emporium.commit('updateFilling', value)
    })

    this.purging = $emporium.state.purging
    this.$watch('purging', (value) => {
      $emporium.commit('updatePurging', value)
    })
  },
  /**
   */
  methods: {
    /**
     */
    exit () {
      this.closeDashboard()
    }
  }
}
</script>

<style lang="stylus">
.avatar-image {
  height: 40px;
  width: 40px;
  background-size: cover;
  background-position: center center;
}

.q-item {
  & > .q-item__section.open-in-popup {
    transform: scale(0);
    transition: transform .3s;
  }

  &:hover {
    & > .q-item__section.open-in-popup {
      transform: scale(1);
    }
  }
}
</style>
