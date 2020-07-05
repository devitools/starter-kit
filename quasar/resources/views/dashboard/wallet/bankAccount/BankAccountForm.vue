<template>
  <SchemaForm v-bind="bind" />
</template>

<script type="text/javascript">
import View from '@devitools/Agnostic/Adapters/View'
import Schema from 'source/domains/Wallet/BankAccount/Schema/BankAccountSchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'BankAccountForm',
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
