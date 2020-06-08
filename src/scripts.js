import { evaluate } from './evaluation'
import { pick } from 'lodash'

export const script = (s, scope) => {


  const initialScope =  s.module.imports && s.module.imports.length > 0 
    ? evaluate(s.module.imports[0], scope).scope
    : scope 

  const result = s.expressions.reduce(
    ({ value, scope }, expression) => {
      const res = evaluate(expression, scope) 
      return { value: [...value, res.value], scope: res.scope }
    }, 
    { value: [], scope: initialScope }
  )

  const exports = s.module.exports 
    ? result.scope.identifiers.filter(({ id }) => s.module.exports.includes(id))
    : result.scope.identifiers

  return { ...result, scope: { identifiers: exports } }
}