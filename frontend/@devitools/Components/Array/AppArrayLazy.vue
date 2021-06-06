<template>
  <AppArray
    class="AppArrayLazy"
    :domain="domain"
    :fields="fields"
    :value="value"
    :primary-key="primaryKey"
    :optimize="optimize"
    :use-uuid="useUuid"
    :hooks="hooks"
    :readonly="readonly"
    :static="static"
    :scope="scope"
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
          :domain="domain"
          :primary-key="primaryKey"
          :hooks="hooks"
          :name="name"
          :overrides="overrides"
          :readonly="readonly"
          :scope="scope"
          :static="static"
          :editable="editable[record.__uuid]"
          @edit="setEditable(record.__uuid, $event)"
          @input="updateItem(index, $event)"
          @cancel="cancelItem(index)"
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
import { AppArrayBasic, AppArrayProps, AppArrayAdd, AppArrayLazy } from './Mixins'

export default {
  /**
   */
  name: 'AppArrayLazy',
  /**
   */
  mixins: [AppArrayBasic, AppArrayProps, AppArrayAdd, AppArrayLazy],
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
