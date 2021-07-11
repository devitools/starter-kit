<template>
  <SchemaForm v-bind="bind" />
</template>

<script type="text/javascript">
import View from '@devitools/Agnostic/Adapters/View'
import Schema from 'source/domains/Settings/Account/Schema/MyAccountSchema'

/**
 */
export default {
  /**
   */
  name: 'MyAccountForm',
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
