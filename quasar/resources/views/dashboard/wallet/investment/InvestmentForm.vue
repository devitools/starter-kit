<template>
  <SchemaForm v-bind="bind" />
</template>

<script type="text/javascript">
import View from '@devitools/Agnostic/Adapters/View'
import Schema from 'source/domains/Wallet/Investment/Schema/InvestmentSchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'InvestmentForm',
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
