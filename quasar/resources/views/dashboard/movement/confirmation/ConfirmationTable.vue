<template>
  <SchemaTable v-bind="bind" />
</template>

<script type="text/javascript">
import View from '@devitools/Agnostic/Adapters/View'
import Schema from 'source/domains/Movement/Confirmation/Schema/ConfirmationSchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'ConfirmationTable',
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
