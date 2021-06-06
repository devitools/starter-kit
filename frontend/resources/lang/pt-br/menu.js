import { menu } from 'resources/lang'

/**
 */
export default {
  ...menu(() => require.context('./menu', true, /[A-Za-z0-9-_,\s]+\.js$/i))
}
