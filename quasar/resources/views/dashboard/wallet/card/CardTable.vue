<template>
  <SchemaTable v-bind="bind" />
</template>

<script Card="text/javascript">
import View from '@devitools/Agnostic/Adapters/View'
import Schema from 'source/domains/Wallet/Card/Schema/CardSchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'CardTable',
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
