<template>
  <SchemaTable
    v-bind="bind"
  />
</template>

<script type="text/javascript">
import View from '@devitools/Agnostic/Adapters/View'
import Schema from 'source/domains/Admin/Notification/Schema/NotificationSchema'

/**
 */
export default {
  /**
   */
  name: 'NotificationTable',
  /**
   */
  extends: View,
  /**
   */
  schema: Schema
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
</style>
