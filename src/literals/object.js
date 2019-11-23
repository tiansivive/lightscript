
import { evaluate } from '../evaluation'



export const create = (obj, scope) => obj.reduce((result, { key, value }) => ({ ...result, [key]: evaluate(value, scope).value }), {})