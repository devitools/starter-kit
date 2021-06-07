<template>
  <div
    class="AuthRecoverPassword flex row"
    :class="{ started }"
  >
    <div class="AuthRecoverPassword__left shadow-3 col-xs-12 col-sm-12 col-md-5 col-lg-4">
      <div class="AuthRecoverPassword__left__header">
        <img
          alt="logo"
          class="AuthRecoverPassword__logo"
          :src="$static('/logo/horizontal-300x120.png')"
        >
      </div>

      <div
        v-if="step === 2"
        class="text-h6 text-center text-grey-default q-mb-lg"
      >
        {{ $lang('pages.auth.forgotPassword.titleRecovering') }}
      </div>

      <div
        v-else
        class="text-h6 text-center text-grey-default q-mb-lg"
      >
        {{ $lang('pages.auth.forgotPassword.title') }}
      </div>

      <form class="AuthRecoverPassword__left__form">
        <div class="row position-relative">
          <div
            v-show="step === 1 || $v.record.email.$error"
            class="col-12 q-pa-sm position-absolute position-absolute"
          >
            <QInput
              v-model.lazy="record.email"
              :label="$lang('pages.auth.forgotPassword.email.label')"
              outlined
              autocomplete="new-password"
              :error="$v.record.email.$error"
              :error-message="$lang('pages.auth.forgotPassword.email.error')"
            >
              <template #prepend>
                <QIcon name="person" />
              </template>
            </QInput>

            <template v-if="step === 1 && siteKey">
              <div
                class="AuthRecoverPassword__recaptcha flex justify-center q-pt-xs q-pb-sm"
                :class="{ 'AuthRecoverPassword__recaptcha--invalid animation-shake': $v.record.recaptcha.$error }"
              >
                <vue-recaptcha
                  ref="recaptcha"
                  :sitekey="siteKey"
                  :load-recaptcha-script="true"
                  @verify="onVerify"
                  @expired="onExpired"
                />
              </div>
              <p
                v-if="$v.record.recaptcha.$error"
                class="text-center text-negative"
              >
                {{ $lang('pages.auth.signIn.errorRecaptcha') }}
              </p>
            </template>
          </div>

          <div
            v-show="step === 2"
            class="col-12 q-pa-sm position-absolute"
          >
            <div class="q-mt-lg position-relative">
              <security-code
                v-model="record.code"
                :length="6"
              />
              <div
                class="text-negative text-center q-mt-sm"
                style="min-height: 22px"
              >
                <template v-if="$v.record.code.$error">
                  {{ $lang('pages.auth.forgotPassword.code.error') }}
                </template>
              </div>
            </div>
          </div>

          <div
            v-show="step === 3"
            class="col-12 q-pa-sm position-absolute"
          >
            <QInput
              v-model="record.password"
              :label="$lang('pages.auth.forgotPassword.password.label')"
              :type="isPassword ? 'password' : 'text'"
              outlined
              autocomplete="new-password"
              :error="$v.record.password.$error"
              :error-message="$lang('pages.auth.forgotPassword.password.error')"
            >
              <template #prepend>
                <QIcon :name="record.password ? 'vpn_key' : 'lock'" />
              </template>
              <template #append>
                <QIcon
                  :name="isPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPassword = !isPassword"
                />
              </template>
            </QInput>

            <QInput
              v-model="record.confirmPassword"
              :label="$lang('pages.auth.forgotPassword.confirmPassword.label')"
              :type="isConfirmPassword ? 'password' : 'text'"
              outlined
              autocomplete="new-password"
              class="q-mt-lg"
              :error="$v.record.confirmPassword.$error"
              :error-message="$lang('pages.auth.forgotPassword.confirmPassword.error')"
            >
              <template #prepend>
                <QIcon
                  name="check_circle"
                  :color="record.password !== '' && (record.password === record.confirmPassword) ? 'positive' : 'rgba(0, 0, 0, 0.54)'"
                />
              </template>
              <template #append>
                <QIcon
                  :name="isConfirmPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isConfirmPassword = !isConfirmPassword"
                />
              </template>
            </QInput>
          </div>
        </div>

        <hr light>

        <div class="q-pa-sm">
          <QBtn
            v-if="step === 1"
            class="AuthRecoverPassword__button full-width"
            color="primary"
            size="lg"
            :label="$lang('pages.auth.forgotPassword.requestVerificationCode')"
            :loading="loading"
            @click="requestVerificationCode"
          />
          <QBtn
            v-if="step === 2"
            class="AuthRecoverPassword__button full-width"
            color="primary"
            size="lg"
            :label="$lang('pages.auth.forgotPassword.validateVerificationCode')"
            :loading="loading"
            @click="validateVerificationCode"
          />
          <QBtn
            v-if="step === 3"
            class="AuthRecoverPassword__button full-width"
            color="primary"
            size="lg"
            :label="$lang('pages.auth.forgotPassword.updatePasswordButton')"
            :loading="loading"
            @click="requestChangePassword"
          />
        </div>
      </form>

      <div class="q-pa-sm flex justify-between">
        <QBtn
          flat
          :ripple="false"
          class="AuthRecoverPassword__button"
          :class="{ 'AuthRecoverPassword__button__small': step !== 3 }"
          color="light-blue-7"
          :label="$lang('pages.auth.forgotPassword.backToSignIn')"
          to="/"
        />
        <QBtn
          v-if="step === 1"
          outline
          :ripple="false"
          class="AuthRecoverPassword__button"
          color="light-blue-7"
          :label="$lang('pages.auth.forgotPassword.gotoTypeTheCode')"
          @click="step = 2"
        />
        <QBtn
          v-else
          outline
          :ripple="false"
          class="AuthRecoverPassword__button"
          color="light-blue-7"
          :label="$lang('pages.auth.forgotPassword.backToRequestCode')"
          @click="step = 1"
        />
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import VueRecaptcha from 'vue-recaptcha'
import { openURL, QBtn, QIcon, QInput } from 'quasar'
import { minLength, required, sameAs } from 'vuelidate/lib/validators'
import $emporium from '@devitools/emporium'

import { dashboard } from 'routes/dashboard'

import SecurityCode from './SecurityCode'
import AuthService from 'source/domains/Auth/Service/AuthService'

export default {
  /**
   */
  name: 'RecoverPassword',
  /**
   */
  components: {
    SecurityCode,
    VueRecaptcha,
    QInput,
    QIcon,
    QBtn
  },
  /**
   */
  data: () => ({
    isPassword: true,
    isConfirmPassword: true,
    started: false,
    step: 1,
    loading: false,
    record: {
      email: '',
      password: '',
      confirmPassword: '',
      code: '',
      recaptcha: ''
    },
    errors: {
      email: false,
      password: false,
      confirmPassword: false,
      code: false,
      recaptcha: false
    },
    siteKey: process.env.VUE_APP_RECAPTCHA_SITEKEY
  }),
  /**
   */
  validations () {
    const valid = (field) => () => this.errors[field] !== true
    const record = {
      email: {
        required,
        valid: valid('email')
      },
      password: {
        required,
        valid: valid('password'),
        minLength: minLength(6)
      },
      confirmPassword: {
        required,
        valid: valid('confirmPassword'),
        sameAsPassword: sameAs('password')
      },
      code: {
        required,
        valid: valid('code'),
        minLength: minLength(6)
      },
      recaptcha: {
        required,
        valid: valid('recaptcha')
      }
    }
    return { record }
  },
  /**
   */
  watch: {
    record: {
      deep: true,
      handler () {
        $emporium.commit('updateModified', true)
      }
    }
  },
  /**
   */
  mounted () {
    window.setTimeout(() => {
      this.started = true
    }, 1000)
  },
  /**
   */
  destroyed () {
    if (this.timeout || this.captchaTimeout) {
      window.clearTimeout(this.timeout)
      window.clearTimeout(this.captchaTimeout)
    }
  },
  /**
   */
  created () {
    const email = this.$route.query.email
    if (email) {
      this.record.email = window.atob(String(email))
    }
    const code = this.$route.query.code
    if (code) {
      this.record.code = window.atob(String(code))
      this.step = 2
    }
  },
  /**
   */
  methods: {
    /**
     */
    openURL,
    /**
     */
    showLoading () {
      this.$q.loading.show()
      this.loading = true
    },
    /**
     */
    hideLoading () {
      this.$q.loading.hide()
      this.loading = false
    },
    /**
     */
    cleanErrors () {
      this.errors = {
        email: false,
        password: false,
        confirmPassword: false,
        code: false,
        recaptcha: false
      }
    },
    /**
     */
    requestVerificationCode () {
      this.cleanErrors()

      this.$v.record.email.$touch()
      this.$v.record.recaptcha.$touch()
      if (this.$v.record.email.$error || this.$v.record.recaptcha.$error) {
        return
      }

      this.showLoading()

      AuthService.instance()
        .recover({ email: this.record.email, recaptcha: this.record.recaptcha })
        .then(() => {
          this.step = 2
          this.status = true
        })
        .catch(({ response }) => {
          if (!response) {
            return
          }

          if (response?.data?.data?.email) {
            this.errors.email = true
          }
          if (response?.data?.data?.recaptcha) {
            this.errors.recaptcha = true
          }
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    /**
     */
    validateVerificationCode () {
      this.cleanErrors()

      this.$v.record.email.$touch()
      this.$v.record.code.$touch()
      if (this.$v.record.email.$error || this.$v.record.code.$error) {
        this.errors.email = this.$v.record.email.$error
        return
      }
      this.step = 3
    },
    /**
     */
    requestChangePassword () {
      this.cleanErrors()

      this.$v.record.password.$touch()
      this.$v.record.confirmPassword.$touch()
      if (this.$v.record.password.$error || this.$v.record.confirmPassword.$error) {
        return
      }

      this.showLoading()

      const email = this.record.email
      const code = this.record.code
      const password = this.record.password
      const confirmPassword = this.record.confirmPassword
      AuthService.instance()
        .change({ email, code, password, confirmPassword })
        .then((response) => {
          const email = response.data.email
          const recaptcha = response.data.recaptcha
          this.$store
            .dispatch('app/setClipboard', { email, password, recaptcha })
            .then(() => {
              $emporium.commit('updateModified', false)
              this.$router.replace('/')
            })
        })
        .catch(({ response }) => {
          this.step = 2
          if (response?.data?.data?.code) {
            this.errors.code = true
          }
          this.$v.record.code.$touch()
        })
        .finally(() => {
          this.hideLoading()

          this.$v.record.password.$touch()
          this.$v.record.confirmPassword.$touch()
        })
    },
    /**
     */
    openDashboard () {
      // show the loading that will be deactivated by DashboardLayout
      this.showLoading()

      let target = this.$route.query.toForbidden
      if (!target) {
        target = this.$route.query.fromForbidden
      }
      if (!target) {
        target = dashboard
      }

      this.$browse(target)
    },
    /**
     * @param {string} response
     */
    onVerify (response) {
      const THIRTY_SECONDS = 30 * 1000
      this.record.recaptcha = response
      this.captchaTimeout = window.setTimeout(() => {
        try {
          this.onExpired()
          this.$v.record.recaptcha.$touch()
          this.$refs.recaptcha.reset()
        } catch (e) {
          // silent is gold
        }
      }, THIRTY_SECONDS)
    },
    /**
     */
    onExpired () {
      this.record.recaptcha = ''
    }
  }
}
</script>

<style lang="scss">
// $

.AuthRecoverPassword {
  height: 100vh;
  overflow-x: hidden;
  opacity: 0.3;
  transition: opacity 0.5s;

  &.started {
    opacity: 1;
  }

  > .AuthRecoverPassword__left {
    padding: 0 30px;
    background-color: #ffffff;
    min-width: 320px;
    min-height: 568px;
    overflow: auto;

    > .AuthRecoverPassword__left__header {
      padding: 2.5vh 3vw 5vh 3vw;
      display: flex;
      justify-content: center;
    }

    .AuthRecoverPassword__logo {
      max-height: 150px;
      max-width: 100%;
      user-select: none;
    }
  }

  .AuthRecoverPassword__recaptcha {
    height: 100px;
    border: 1px solid transparent;

    &.AuthRecoverPassword__recaptcha--invalid > div > div > div > iframe {
      border: 1px solid #c10015;
      border-radius: 3px;
      box-shadow: 0 0 8px 2px rgba(193, 0, 21, 0.4);
    }
  }

  .AuthRecoverPassword__button {
    min-height: 42px;

    &.AuthRecoverPassword__button__small {
      text-decoration: underline;
    }
  }

  @media (min-height: 600px) {
    .AuthRecoverPassword__left__header {
      margin: calc((98vh - 600px) / 2) 0 0 0;
    }
  }

  @media (max-width: 600px) {
    .AuthRecoverPassword__left {
      padding: 0 10px;

      .AuthRecoverPassword__button.AuthRecoverPassword__button__small {
        font-size: 12px;
        max-width: 120px;
      }

      .AuthRecoverPassword__left__header {
        padding: 10px 10px 20px 10px;

        > img {
          max-height: 90px;
        }
      }
    }
  }
}
</style>
