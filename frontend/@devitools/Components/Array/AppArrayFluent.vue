<template>
  <AppArray
    class="AppArrayFluent"
    :domain="domain"
    :fields="fields"
    :value="value"
    :primary-key="primaryKey"
    :optimize="optimize"
    :use-uuid="useUuid"
    :hooks="hooks"
    :readonly="readonly"
    :static="static"
    :debugger-allowed="debuggerAllowed"
    :inherit-errors="inheritErrors"
    :length="records.length"
  >
    <template v-slot:body>
      <template v-for="(record, index) in records">
        <AppArrayRow
          :key="record.__uuid"
          :ref="`body-${index}`"
          :fields="fields"
          :value="record"
          :scope="scope"
          :domain="domain"
          :hooks="hooks"
          :name="name"
          :primary-key="primaryKey"
          :readonly="readonly"
          :static="static"
          :fluent="true"
          @input="updateItem(index, $event)"
          @remove="removeItem(index)"
        />
      </template>
    </template>

    <template v-slot:add>
      <QBtn
        v-if="!readonly && !static"
        v-bind="$options.INTERNAL_ATTRS"
        icon="add"
        @click="addItem"
      >
        <AppTooltip>{{ $lang('agnostic.components.array.add') }}</AppTooltip>
      </QBtn>
    </template>
  </AppArray>
</template>

<script type="text/javascript">
import { QBtn } from 'quasar'

import AppArray from './AppArray'
import AppArrayRow from './Partials/AppArrayRow'
import { AppArrayBasic, AppArrayProps, AppArrayAdd, AppArrayFluent } from './Mixins'

export default {
  /**
   */
  name: 'AppArrayFluent',
  /**
   */
  mixins: [AppArrayBasic, AppArrayProps, AppArrayAdd, AppArrayFluent],
  /**
   */
  components: { AppArray, AppArrayRow, QBtn }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
</style>
