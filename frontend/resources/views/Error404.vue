<template>
  <div class="fixed-center text-center">
    <QImg
      :src="$static('404.svg')"
      alt="notfound_img"
    />
    <div
      :class="textClass"
      class="q-mt-lg mono-font q-mb-lg"
    >
      A página que você está procurando não existe
    </div>
    <br>
    <QBtn
      unelevated
      :ripple="false"
      text-color="white"
      style="width:290px; background-color: #046ea7; font-size: 1.1em;"
      @click="$browse('/')"
    >
      <QIcon
        left
        size="1.5em"
        name="keyboard_backspace"
      />
      Voltar para {{ $t('name') }}
    </QBtn>
  </div>
</template>

<script lang="js" type="text/javascript">
import { QBtn, QIcon, QImg } from 'quasar'

export default {
  /**
   */
  name: 'Error404',
  /**
   */
  components: {
    QBtn,
    QIcon,
    QImg
  },
  /**
   */
  computed: {
    textClass () {
      return this.$q.screen.lt.sm
        ? 'text-h6'
        : 'text-h5'
    }
  }
}
</script>
