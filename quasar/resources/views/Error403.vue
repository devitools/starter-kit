<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
        alt=""
      >
    </p>
    You are coming from
    <pre>{{ $route.query.fromForbidden }}</pre>
    <br>
    and you have no access to
    <pre>{{ $route.query.toForbidden }}</pre>
    <br>
    <QBtn
      color="primary"
      style="width:200px;"
      @click="$browse(-2)"
    >
      Go back
    </QBtn>
    <br>
    <br>
    <QBtn
      flat
      style="width:200px;"
      @click="$browse(otherwise, true)"
    >
      Back Sign In
    </QBtn>
  </div>
</template>

<script lang="js">
import { QBtn } from 'quasar'
import { otherwise } from 'src/router'

export default {
  /**
   */
  name: 'Error403',
  /**
   */
  components: { QBtn },
  /**
   */
  computed: {
    otherwise () {
      return otherwise
    }
  }
}
</script>

<style scoped>
pre {
  display: inline-block;
  background: #ddd;
  padding: 2px 8px;
}
</style>
