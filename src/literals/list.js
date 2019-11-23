
import { evaluate } from '../evaluation'


export const create = (list, scope) => list.map(e => evaluate(e, scope).value)