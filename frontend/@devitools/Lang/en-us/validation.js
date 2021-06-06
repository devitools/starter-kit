/**
 * @type {Object}
 */
export default {
  alphaNum: 'The field must be a numeric alpha',
  decimal: 'The field must be a decimal number',
  ipAddress: 'Value must be a valid IP',
  macAddress: 'Value must be a valid MAC address',
  notFound: 'Record not found',
  maxFileSize: 'The file must not be larger than {size}kb',
  accepted: 'The field must be accepted',
  active_url: 'The field is not a valid URL',
  after: 'The field must be a date after :date',
  after_or_equal: 'The field must be a date after or equal to :date',
  alpha: 'The field may only contain letters',
  alpha_dash: 'The field may only contain letters, numbers, dashes and underscores',
  alpha_num: 'The field may only contain letters and numbers',
  array: 'The field must be an array',
  bail: 'bail',
  before: 'The field must be a date before {before}',
  before_or_equal: 'The field must be a date before or equal to {before_or_equal}',
  between: 'Entered value exceeds limits',
  boolean: 'The field field must be true or false',
  confirmed: 'The field confirmation does not match',
  date: 'The field is not a valid date',
  date_equals: 'The field must be a date equal to {date_equals}',
  date_format: 'The field does not match the format {date_format}',
  different: 'The field and :other must be different',
  digits: 'The field must be :digits digits',
  digits_between: 'The field must be between {min} and {max} digits',
  dimensions: 'The field has invalid image dimensions',
  distinct: 'The field field has a duplicate value',
  email: 'The field must be a valid email address',
  ends_with: 'The field must end with one of the following: :values',
  exclude_if: 'exclude_if:another,value',
  exclude_unless: 'exclude_unless:another,value',
  exists: 'The selected value is invalid',
  file: 'The field must be a file',
  filled: 'The field field must have a value',
  gt: 'The field must be greater than {gt}',
  gte: 'The field must be greater than or equal {gte}',
  image: 'The field must be an image',
  in: 'The selected value is invalid',
  in_array: 'The field field does not exist in {in_array}',
  integer: 'The field must be an integer',
  ip: 'The field must be a valid IP address',
  ipv4: 'The field must be a valid IPv4 address',
  ipv6: 'The field must be a valid IPv6 address',
  json: 'The field must be a valid JSON string',
  lt: 'The field must be less than {lt}',
  lte: 'The field must be less than or equal {lte}',
  max: 'The field may not be greater than {max}',
  mimes: 'The field must be a file of type: {mimes}',
  mimetypes: 'The field must be a file of type: {mimetypes}',
  minLength: 'Minimum {min} characters',
  maxLength: 'Max {max} characters',
  minValue: 'The minimum value accepted is {min}',
  maxValue: 'The maximum value accepted is {max}',
  min: 'The field must be at least {min}',
  not_in: 'The selected value is invalid',
  not_regex: 'The field format is invalid',
  nullable: 'nullable',
  numeric: 'The field must be a number',
  password: 'Password must have letters, numbers and at least six chars',
  present: 'The field field must be present',
  regex: 'The field format is invalid',
  required: 'The field is required',
  required_if: 'The field is required when :other is :value',
  required_unless: 'The field is required unless :other is in :values',
  required_with: 'The field is required when :values is present',
  required_with_all: 'The field is required when :values are present',
  required_without: 'The field is required when :values is not present',
  required_without_all: 'The field is required when none of :values are present',
  same: 'The field and {same} must match',
  size: 'The field must be {size}',
  starts_with: 'The field must start with one of the following: :values',
  string: 'The field must be a string',
  timezone: 'The field must be a valid zone',
  unique: 'The field has already been taken',
  uploaded: 'The field failed to upload',
  url: 'The field format is invalid',
  uuid: 'The field must be a valid UUID.',

  requiredIf: 'configure [validations.{field}.requiredIf] on i18n schema file',
  requiredUnless: 'configure [validations.{field}.requiredUnless] on i18n schema file',
  sameAs: 'configure [validations.{field}.sameAs] on i18n schema file',
  or: 'configure [validations.{field}.or] on i18n schema file',
  and: 'configure [validations.{field}.and] on i18n schema file',
  not: 'configure [validations.{field}.not] on i18n schema file',
  withParams: 'configure [validations.{field}.withParams] on i18n schema file'

  // between: {
  //   numeric: 'The value must be between :min and :max',
  //   file: 'The value must be between :min and :max kilobytes',
  //   string: 'The value must be between :min and :max characters',
  //   array: 'The value must have between :min and :max items.'
  // },

  // gt: {
  //   numeric: 'The value must be greater than :value',
  //   file: 'The value must be greater than :value kilobytes',
  //   string: 'The value must be greater than :value characters',
  //   array: 'The value must have more than :value items.'
  // },
  // gte: {
  //   numeric: 'The value must be greater than or equal :value',
  //   file: 'The value must be greater than or equal :value kilobytes',
  //   string: 'The value must be greater than or equal :value characters',
  //   array: 'The value must have :value items or more.'
  // },

  // lt: {
  //   numeric: 'The value must be less than :value',
  //   file: 'The value must be less than :value kilobytes',
  //   string: 'The value must be less than :value characters',
  //   array: 'The value must have less than :value items.'
  // },

  // lte: {
  //   numeric: 'The value must be less than or equal :value',
  //   file: 'The value must be less than or equal :value kilobytes',
  //   string: 'The value must be less than or equal :value characters',
  //   array: 'The value must not have more than :value items.'
  // },

  // max: {
  //   numeric: 'The value may not be greater than :max',
  //   file: 'The value may not be greater than :max kilobytes',
  //   string: 'The value may not be greater than :max characters',
  //   array: 'The value may not have more than :max items.'
  // },

  // min: {
  //   numeric: 'The value must be at least :min',
  //   file: 'The value must be at least :min kilobytes',
  //   string: 'The value must be at least :min characters',
  //   array: 'The value must have at least :min items.'
  // },

  // size: {
  //   numeric: 'The value must be :size',
  //   file: 'The value must be :size kilobytes',
  //   string: 'The value must be :size characters',
  //   array: 'The value must contain :size items.'
  // },

}
