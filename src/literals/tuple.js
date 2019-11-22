import { map } from 'lodash/fp'
import { evaluate } from '../evaluation'


export const create = map(e => evaluate(e))