<template>
  <q-input
    :mask="mask"
    :value="inputValue"
    @input="inputUpdateValue($event)"
    v-bind="bind"
  >
    <template v-slot:append>
      <DateWidgetDate
        :format="format"
        :value="widgetValue"
        :disable="readonly"
        @input="widgetUpdateValue($event)"
      />
    </template>
  </q-input>
</template>

<script>
import { QInput } from 'quasar'

import MixinPropsDate from './MixinPropsDate'
import MixinBehaviour from './MixinBehaviour'
import DateWidgetDate from './DateWidgetDate'

export default {
  /**
   */
  name: 'AppDate',
  /**
   */
  components: { QInput, DateWidgetDate },
  /**
   */
  mixins: [MixinPropsDate, MixinBehaviour]
}
</script>

<style scoped>

</style>
