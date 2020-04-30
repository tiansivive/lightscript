
import { evaluate } from '../evaluation'
import { transforms } from '../ffi'


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

  const { value: fn } = evaluate(id, scope)

  if(process.env.DEBUG){
    console.log('function application')
    console.log('closure:', (fn.closure && fn.closure.identifiers) || [])
    console.log('args:', fn.args)
    console.log('scope:', scope.identifiers)
  }

  if(params.length < fn.args.length) throw new Error (`Not enough arguments when applying ${id.type === 'identifier' ? id.value : 'anonymous fn'}`)
  
  const boundArgs = fn.args.map((arg, i) => ({ id: arg, value: evaluate(params[i], scope).value }))
  const updatedIds = scope.identifiers
    .filter(({ id }) => !boundArgs.some(a => a.id === id))
    .concat(boundArgs)


  if(fn.foreign){
    const jsTransformed = boundArgs.map(a => a.value.type
      ? transforms.toJS(a.value, { identifiers: updatedIds }) 
      : a.value
    )
    return { value: fn.body(...jsTransformed), scope }
  }  

  if(params.length > fn.args.length){
    if(fn.body.type !== 'function') throw new Error (`Tried to apply too many arguments to function ${id.value}`)

    const body = { type: 'function-application', params: params.slice(boundArgs.length), id: fn.body }
    const res = evaluate(body, { identifiers: updatedIds })

    return { value: res.value, scope }
  } 
  
  const res = evaluate(fn.body, { identifiers: updatedIds })
  return { value: res.value, scope }
}

