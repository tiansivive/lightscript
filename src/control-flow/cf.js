import * as I from '../identifiers'
import { evaluate } from '../evaluation'

export const ifThenElse = (expr, scope) => (evaluate(expr.condition, scope) ? evaluate(expr.truthy, scope) : evaluate(expr.falsy, scope))


export const patternMatching = ({ expression, patterns, otherwise }, scope) => {


  const val = evaluate(expression, scope).value
  const context = { ...scope }


  const branch = patterns.find(({ evaluation }) => {
    
    if(evaluation.type === 'identifier'){
      
      const exists = scope.identifiers.find(({ id }) => id === evaluation.value)
      if(exists) throw new Error(`Trying to redeclare identifier ${evaluation.value}`)

      context.identifiers.push({ id: evaluation.value, value: val })
      return true
    }
    
    return evaluate(evaluation, context).value === val
  })


  if(!branch){

    if(!otherwise) throw new Error(`Pattern matching is not comprehensive, perhaps you forgot to add an 'otherwise' clause?`)
    return { value: evaluate(otherwise, context).value, scope }

  } else return { value: evaluate(branch.value, context).value, scope }
  
}