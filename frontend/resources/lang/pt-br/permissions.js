import { permissions } from 'resources/lang'

/**
 */
export default {
  ...permissions(() => require.context('./permissions', true, /[A-Za-z0-9-_,\s]+\.js$/i))
}
