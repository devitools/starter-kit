<template>
  <SchemaForm v-bind="bind" />
</template>

<script type="text/javascript">
import View from '@devitools/Agnostic/Adapters/View'
import Schema from 'source/domains/Movement/Expense/Schema/ExpenseSchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'ExpenseForm',
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
