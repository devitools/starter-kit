<template>
  <SchemaForm v-bind="bind">
    <template #form-body="{ record }">
      <div class="app-form-body">
        <div class="q-pt-sm q-pl-md q-pr-md">
          <div class="text-subtitle1">
            {{ $util.get(record, 'ntf_titulo') }}
            <hr>
          </div>
          <!-- ntf_usuario -->
          <!-- ntf_recebimento -->
          <!-- ntf_visualizada -->
        </div>
        <div class="q-pl-md q-pr-md">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <component :is="renderMessage($util.get(record, 'ntf_descricao'))" />
        </div>
      </div>
    </template>
  </SchemaForm>
</template>

<script type="text/javascript">
import View from '@devitools/Agnostic/Adapters/View'
import Schema from 'source/domains/Admin/Notification/Schema/NotificationSchema'

/**
 */
export default {
  /**
   */
  name: 'NotificationForm',
  /**
   */
  extends: View,
  /**
   */
  schema: Schema,
  /**
   */
  methods: {
    /**
     * @param {string} template
     * @return {*}
     */
    renderMessage (template) {
      return {
        name: 'DynamicMessage',
        template: `<div>${template}</div>`
      }
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
</style>
