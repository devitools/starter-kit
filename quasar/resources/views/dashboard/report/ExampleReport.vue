<template>
  <SchemaReport v-bind="bind" />
</template>

<script type="text/javascript">
import View from '@devitools/Agnostic/Adapters/View'
import Report from 'source/domains/Report/Example/Schema/ExampleReport'

export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'Transaction',
  /**
   */
  schema: Report
}
</script>

<style scoped>

</style>
