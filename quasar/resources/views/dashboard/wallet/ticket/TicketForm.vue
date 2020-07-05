<template>
  <SchemaForm v-bind="bind" />
</template>

<script type="text/javascript">
import View from '@devitools/Agnostic/Adapters/View'
import Schema from 'source/domains/Wallet/Ticket/Schema/TicketSchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'TicketForm',
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
