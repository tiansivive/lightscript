import { reduce } from 'lodash/fp'
import { evaluate } from './evaluation'

export const merge = reduce((obj, { key, value }) => ({ ...obj, [key]: evaluate(value) }))

export const create = merge({})