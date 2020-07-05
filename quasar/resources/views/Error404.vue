<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
        alt=""
      >
    </p>
    Not found <pre>{{ $route.fullPath }}</pre>
    <br>
    <QBtn
      color="secondary"
      style="width:200px;"
      @click="$browse(-1)"
    >
      Go back
    </QBtn>
    <br>
    <br>
    <QBtn
      flat
      style="width:200px;"
      @click="$browse('/')"
    >
      Back Home
    </QBtn>
  </div>
</template>

<script lang="js">
import { QBtn } from 'quasar'

export default {
  /**
   */
  name: 'Error404',
  /**
   */
  components: { QBtn }
}
</script>

<style scoped>
pre {
  display: inline-block;
  background: #ddd;
  padding: 2px 8px;
}
</style>
