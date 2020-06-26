<template>
  <div
    class="AuthIndex flex row"
    :class="{ started }"
  >
    <div class="AuthIndex__left shadow-3 col-xs-12 col-sm-12 col-md-5 col-lg-4">
      <div class="AuthIndex__left__header">
        <img
          alt="logo"
          class="AuthIndex__logo"
          :src="$static('/logo-horizontal.png')"
        >
      </div>

      <form
        class="AuthIndex__left__form"
        @submit.prevent="attempt"
      >
        <div class="row">
          <div class="col-12 q-pa-sm">
            <QInput
              :label="$lang('auth.signIn.username')"
              outlined
              v-model="record.username"
              :error="$v.record.username.$error"
              :error-message="$lang('validation.required')"
            >
              <template v-slot:prepend>
                <QIcon name="person" />
              </template>
            </QInput>
          </div>
          <div class="col-12 q-pa-sm q-pb-md">
            <QInput
              :label="$lang('auth.signIn.password')"
              :type="isPassword ? 'password' : 'text'"
              outlined
              v-model="record.password"
              :error="$v.record.password.$error"
              :error-message="$lang('validation.password')"
            >
              <template v-slot:prepend>
                <QIcon :name="record.password ? 'vpn_key' : 'lock'" />
              </template>
              <template v-slot:append>
                <QIcon
                  :name="isPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPassword = !isPassword"
                />
              </template>
            </QInput>
          </div>
        </div>
        <hr>
        <div class="q-pa-sm">
          <QBtn
            class="AuthIndex__button full-width"
            color="primary"
            size="lg"
            :label="$lang('auth.signIn.button')"
            type="submit"
            :loading="loading"
          />
        </div>
      </form>

      <q-btn
        unelevated
        :ripple="false"
        class="AuthIndex__button"
        text-color="light-blue-7"
        to="/register"
        :label="$lang('auth.signIn.goToRegister')"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import { QBtn, QIcon, QInput } from 'quasar'
import { required } from 'vuelidate/lib/validators'
import AuthAttempt from 'source/modules/Auth/AuthAttempt'
import { dashboard } from 'routes/dashboard'
import { me } from 'source/domains/Auth/Service'

export default {
  /**
   */
  name: 'AuthSignIn',
  /**
   */
  mixins: [
    AuthAttempt
  ],
  /**
   */
  components: {
    QInput,
    QIcon,
    QBtn
  },
  /**
   */
  data: () => ({
    started: false,
    isPassword: true,
    record: {
      username: process.env.VUE_APP_DEFAULT_LOGIN,
      password: process.env.VUE_APP_DEFAULT_PASSWORD
    }
  }),
  /**
   */
  validations () {
    return {
      record: {
        username: { required },
        password: { required }
      }
    }
  },
  /**
   */
  methods: {
    /**
     */
    attemptFail () {
      this.$message.warning(this.$lang('auth.signIn.validation'))
    },
    /**
     */
    attempting () {
      // noinspection JSCheckFunctionSignatures
      return this.$service.login(this.record.username, this.record.password)
    },
    /**
     * @param {Object} response
     */
    attemptSuccess ({ data }) {
      this.$store
        .dispatch('auth/login', data.token)
        .then(this.attemptFetchUser)
        .catch(() => this.$q.loading.hide())
    },
    /**
     */
    attemptError () {
      this.$message.error(this.$lang('auth.signIn.error'))
    },
    /**
     */
    attemptFetchUser () {
      this.$q.loading.show({ delay: 0 })
      me()
        .then(this.openDashboard)
        .finally(() => window.setTimeout(() => this.$q.loading.hide(), 2000))
    },
    /**
     */
    openDashboard () {
      let target = dashboard
      if (this.$route.query.current) {
        target = this.$route.query.current
      }
      this.$browse(target)
    },
    /**
     * @param {{username: string, password: string}} credentials
     */
    signInFromClipboard (credentials) {
      if (!credentials.username || !credentials.password) {
        return
      }
      this.record.username = credentials.username
      this.record.password = credentials.password
      this.attempt()
    }
  },
  /**
   */
  created () {
    if (!this.$store.getters['app/getClipboard']) {
      return
    }

    const credentials = this.$store.getters['app/getClipboard']

    this.$store
      .dispatch('app/clearClipboard')
      .then(() => this.signInFromClipboard(credentials))
  },
  mounted () {
    window.setTimeout(() => { this.started = true }, 1000)
  }
}
</script>

<style lang="stylus">
@import '~src/css/quasar.variables.styl'

.AuthIndex
  height 100vh
  overflow-x hidden
  opacity 0.3
  transition opacity 0.5s

  &.started
    opacity 1

  > .AuthIndex__left
    padding 0 6vw
    background-color white
    min-width 320px

    > .AuthIndex__left__header
      margin 10vh 0 0 0
      padding 3vh 3vw
      display flex
      justify-content center

    > .AuthIndex__left__form
      margin 10vh 0 0 0

    .AuthIndex__logo
      max-height 100px
      max-width 100%
      user-select none

  .AuthIndex__button
    min-height 42px

.q-field__label
  color #c5d2d1
</style>
