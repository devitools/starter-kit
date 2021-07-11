import { domains } from 'resources/lang'

/**
 */
export default {
  ...domains(() => require.context('../../../source/domains', true, /lang\/pt-br\.js$/i))
}
