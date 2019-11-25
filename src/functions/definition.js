
import { evaluate } from '../evaluation'


export const create = (expr, scope) => {

  const fnObject = { 
    type: expr.type,
    args: expr.args,
    body: expr.value,
    closure: scope
  }
  return {
    value: fnObject,
    scope
  }
}

export const apply = (id, params, scope) => {

  //const name = `fn-${id.value}` || 'fn-anonymous' 
  const { value: fn } = evaluate(id, scope)

  if(params.length < fn.args.length) throw new Error (`Not enough arguments when applying ${id.type === 'identifier' ? id.value : 'anonymous fn'}`)
  
  const boundArgs = fn.args.map((arg, i) => ({ id: arg, value: evaluate(params[i], scope).value }))

  if(params.length > fn.args.length){
    if(fn.body.type !== 'function') throw new Error (`Tried to apply too many arguments to function ${id.value}`)

    const body = { type: 'function-application', params: params.slice(boundArgs.length), id: fn.body }
    const res = evaluate(body, { identifiers: [...scope.identifiers, ...boundArgs, ...fn.closure.identifiers] })

    return { value: res.value, scope }
  } 
  
  const res = evaluate(fn.body, { identifiers: [...scope.identifiers, ...boundArgs, ...fn.closure.identifiers] })
  return { value: res.value, scope }
}