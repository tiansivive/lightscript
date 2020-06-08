
import { map, flatten, pipe, uniqBy, concat } from 'lodash/fp'

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

  const { value: fn } = id.type === 'function' ? { value: id } : evaluate(id, scope)

  if(process.env.DEBUG){
    console.log('function application')
    console.log('closure:', (fn.closure && fn.closure.identifiers) || [])
    console.log('args:', fn.args)
    console.log('scope:', scope.identifiers)
  }

  if(params.length < fn.args.length) throw new Error (`Not enough arguments when applying ${id.type === 'identifier' ? id.value : 'anonymous fn'}`)
  
  const boundArgs = fn.args.map((arg, i) => ({ 
    id: arg, 
    value: params[i].type ? evaluate(params[i], scope).value : params[i]
  }))

  let updatedIds = scope.identifiers
  if(fn.closure){
    updatedIds = updatedIds
      .filter(({ id }) => !fn.closure.identifiers.some(a => a.id === id))
      .concat(fn.closure.identifiers)
  }
  updatedIds = updatedIds
    .filter(({ id }) => !boundArgs.some(a => a.id === id))
    .concat(boundArgs)

  
  if(fn.decorator){
    const injected = fn.decorator.value.reduce((acc, expr, i) => {
      const { 
        value, 
        scope = { identifiers: [] }
      } = evaluate(expr, { identifiers: acc.identifiers })
      
      return {
        props: [...acc.props, value],
        identifiers: acc.identifiers.concat(scope.identifiers)
      }
      
    }, { identifiers: [], props: [] })
    
    const decorated = apply(fn.decorator.id, [injected.props], scope)
  

    //TODO: evaluate decorator fn by passing in evals as args
    updatedIds = pipe(
      concat(injected.identifiers),
      uniqBy('id'),
      concat(decorated.value.map((v, i) => ({ id: `$${i + 1}`, value: v })))
    )(updatedIds)

    
  }


  if(fn.foreign){
    const jsTransformed = boundArgs.map(a => a.value.type
      ? transforms.toJS(a.value, { identifiers: updatedIds }) 
      : a.value
    )
    return { value: fn.body(...jsTransformed), scope }
  }  

  if(fn.composed){
     const next = apply(fn.first, params, scope)
     const res = apply(fn.second, [next.value], next.scope)
     return { value: res.value, scope }
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

