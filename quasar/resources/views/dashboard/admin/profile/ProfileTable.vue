<template>
  <SchemaTable v-bind="bind" />
</template>

<script type="text/javascript">
import View from '@devitools/Agnostic/Adapters/Async'
import Schema from 'source/domains/Admin/Profile/Schema/ProfileSchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'ProfileTable',
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
