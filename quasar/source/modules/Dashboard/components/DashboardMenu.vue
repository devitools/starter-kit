<template>
  <QBtnDropdown
    stretch
    flat
    content-class="DashboardLayout__dropdown_menu"
  >
    <template v-slot:label>
      <small class="DashboardLayout__user q-pl-sm q-pr-md">{{ username }}</small>
      <QAvatar
        color="white"
        text-color="primary"
      >
        <template v-if="photo">
          <img
            :src="photo"
            alt="photo"
          >
        </template>
        <template v-else>
          {{ letter }}
        </template>
      </QAvatar>
    </template>
    <QList>
      <QItem
        clickable
        v-ripple
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
        clickable
        v-ripple
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
            label="Debugger"
            color="red"
          />
        </QItemSection>
      </QItem>

      <QItem v-if="$dev">
        <QItemSection>
          <QToggle
            v-model="purging"
            label="Purger"
            color="red"
          />
        </QItemSection>
      </QItem>
    </QList>
  </QBtnDropdown>
</template>

<script>
import { QAvatar, QBtnDropdown, QItem, QItemLabel, QItemSection, QList, QToggle } from 'quasar'
import $store from '@devitools/store'
import { otherwise } from 'src/router'

export default {
  /**
   */
  name: 'DashboardMenu',
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
  data: () => ({
    debugging: false,
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
     * @returns {Object}
     */
    username () {
      return this.$util.get(this.$store.getters['auth/getUser'], 'username')
    },
    /**
     * @returns {Object}
     */
    photo () {
      return this.$util.get(this.$store.getters['auth/getUser'], 'photo')
    },
    /**
     * @returns {Object}
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
  methods: {
    /**
     */
    exit () {
      this.$store.dispatch('auth/updateUser', undefined).then(this.logout)
    },
    /**
     */
    logout () {
      this.$store.dispatch('auth/logout').then(() => this.$browse(otherwise))
      this.$memory.clear()
    }
  },
  /**
   */
  created () {
    if (!this.$dev) {
      return
    }

    this.debugging = $store.state.debugging
    this.$watch('debugging', (debugging) => {
      $store.commit('updateDebugging', debugging)
    })

    this.purging = $store.state.purging
    this.$watch('purging', (purging) => {
      $store.commit('updatePurging', purging)
    })
  }
}
</script>

<style lang="stylus">
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
