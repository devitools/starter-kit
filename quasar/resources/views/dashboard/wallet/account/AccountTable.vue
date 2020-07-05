<template>
  <SchemaTable v-bind="bind" />
</template>

<script type="text/javascript">
import View from '@devitools/Agnostic/Adapters/View'
import Schema from 'source/domains/Wallet/Account/Schema/AccountSchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'AccountTable',
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
