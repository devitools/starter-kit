import { QTooltip } from 'quasar'
import { validateOffset, validatePosition } from 'quasar/src/utils/position-engine'
import {
  TOOLTIP_ANCHOR,
  TOOLTIP_CONTENT_CLASS,
  TOOLTIP_CONTENT_STYLE,
  TOOLTIP_DELAY,
  TOOLTIP_OFFSET
} from 'src/settings/tooltip'

/**
 * @component {AppTooltip}
 */
export default {
  /**
   */
  extends: QTooltip,
  /**
   */
  name: 'AppTooltip',
  /**
   */
  props: {
    contentClass: {
      type: [Array, String, Object],
      default: () => TOOLTIP_CONTENT_CLASS
    },
    contentStyle: {
      type: [Array, String, Object],
      default: () => TOOLTIP_CONTENT_STYLE
    },
    anchor: {
      type: String,
      default: TOOLTIP_ANCHOR,
      validator: validatePosition
    },
    offset: {
      type: Array,
      default: () => TOOLTIP_OFFSET,
      validator: validateOffset
    },
    delay: {
      type: Number,
      default: TOOLTIP_DELAY
    }
  }
}
