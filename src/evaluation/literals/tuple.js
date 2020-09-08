
import { evaluate } from '../evaluation'


export const create = (tuple, scope) => tuple.map(e => evaluate(e, scope).value)