import * as I from './identifiers'
import * as O from './literals/object'
import * as L from './literals/list'
import * as T from './literals/tuple'
import * as FN from './functions/definition'




/**
 * 
 * @param { Expression } expr 
 * @param { Scope } scope 
 * 
 * @return {{ value: *, scope: Scope }}
 */
const assignment = ({ id, value }, scope) => {

  const result = evaluate(value, scope)
  const identifiers = [{ id: id.value, value: result.value }, ...scope.identifiers]

  return { value: result.value, scope: { identifiers } }
}

const math = (expr, scope) => {
  const { value: left } = evaluate(expr.left, scope)
  if (typeof left !== 'number') throw new Error('Left side of math expression not a number')
  const { value: right } = evaluate(expr.right, scope)
  if (typeof right !== 'number') throw new Error('Right side of math expression not a number')

  switch (expr.operator) {
    case '+':
      return left + right
    case '-':
      return left - right
    case '*':
      return left * right
    case '/':
      return left / right
  }
}


/**
 * 
 * @param { Expression } expr 
 * @param { Scope } scope 
 * 
 * @return {{ value: *, scope: Scope }}
 */
export const evaluate = (expr, scope) => {
  console.log('evaluating:', expr.type)
  switch (expr.type) {
    case 'boolean':
    case 'number':
    case 'string':
      return { value: expr.value, scope }
    case 'tuple':
      return { value:  T.create(expr.value, scope), scope }
    case 'list':
      return { value:  L.create(expr.value, scope), scope }
    case 'record':
      return { value:  O.create(expr.value, scope), scope }
    case 'property':
      const resolvedObject = evaluate(expr.context, scope).value
      return { value: resolvedObject[expr.value.value], scope } 
   
    case 'identifier':
     
      return { value: I.find(expr.value, scope), scope }
    case 'assignment':
      return assignment(expr, scope)

    case 'math':
      return { value: math(expr, scope), scope }

    case 'literal':         
    case 'expression':
      return evaluate(expr.value, scope)

    case 'function':
      //return FN.create(expr)
      return { value: expr, scope }

    case 'function-application':
      return FN.apply(expr.id, expr.params, scope)

    case 'script':
      return expr.val.reduce(
        ({ value, scope }, expression) => {
          const res = evaluate(expression, scope) 
          return { value: [...value, res.value], scope: res.scope }
        }, 
        { value: [], scope }
      )
  }
}
