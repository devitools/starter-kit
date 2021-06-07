<template>
  <div class="fixed-center text-center">
    <QImg
      :src="$static('auth/403.svg')"
      alt="notfound_img"
    />
    <div
      :class="textClass"
      class="q-mt-lg mono-font q-mb-lg"
    >
      Você não tem permissão para acessar essa página
    </div>
    <br>
    <div
      class="flex justify-center"
      style="gap: 20px;"
    >
      <QBtn
        :ripple="false"
        color="primary"
        @click="$browse('/')"
      >
        <QIcon
          left
          size="1.5em"
          name="keyboard_backspace"
        />
        Voltar para {{ $t('name') }}
      </QBtn>

      <QBtn
        flat
        :ripple="false"
        color="default"
        @click="exit"
      >
        Sair
        <QIcon
          right
          size="1.5em"
          name="power_settings_new"
        />
      </QBtn>
    </div>
  </div>
</template>

<script
  lang="js"
  type="text/javascript"
>
import { QBtn, QIcon, QImg } from 'quasar'
import DashboardSession from 'source/modules/Dashboard/DashboardSession'

export default {
  /**
   */
  name: 'Error403',
  /**
   */
  components: {
    QBtn,
    QImg,
    QIcon
  },
  /**
   */
  mixins: [DashboardSession],
  /**
   */
  computed: {
    textClass () {
      return this.$q.screen.lt.sm
        ? 'text-h6'
        : 'text-h5'
    }
  },
  /**
   */
  created () {
    this.$q.loading.hide()
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
