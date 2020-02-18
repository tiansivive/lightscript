
import { evaluate } from '../evaluation'


export const create = ({ type, value }, scope) => ({ 
  type, 
  value: value
    .map(pat => evaluate(pat, scope))
    .flatMap(({ value }) => value.subPatterns),
  closure: scope
})

