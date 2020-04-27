
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


const applyAux = (fn, params, boundArgs, scope) => {
  if(params.length > fn.args.length){
    if(fn.body.type !== 'function') throw new Error (`Tried to apply too many arguments to function ${id.value}`)

    const body = { type: 'function-application', params: params.slice(boundArgs.length), id: fn.body }
    const res = evaluate(body, { identifiers: updatedIds })

    return { value: res.value, scope }
  } 
  
  const res = evaluate(fn.body, { identifiers: updatedIds })
  return { value: res.value, scope }
}

export const apply = (id, params, scope) => {

  //const name = `fn-${id.value}` || 'fn-anonymous' 
  const { value: fn } = evaluate(id, scope)

  console.log('function application')
  console.log('closure:', (fn.closure && fn.closure.identifiers) || [])
  console.log('args:', fn.args)
  console.log('scope:', scope.identifiers)

  if(params.length < fn.args.length) throw new Error (`Not enough arguments when applying ${id.type === 'identifier' ? id.value : 'anonymous fn'}`)
  
  const boundArgs = fn.args.map((arg, i) => ({ id: arg, value: evaluate(params[i], scope).value }))

  const updatedIds = scope.identifiers
    .filter(({ id }) => !boundArgs.some(a => a.id === id))
    .concat(boundArgs)


  if(fn.foreign){

    const jsTransformed = boundArgs.map(a => {
      if(a.value.type){

        if(a.value.type === 'function'){
         
          return function(...args){
            const bound = a.value.args.map((arg, i) => ({ id: arg, value: args[i] }))
            const res = evaluate(a.value.body, { 
              identifiers: updatedIds
                .filter(({ id }) => !bound.some(a => a.id === id))
                .concat(bound)
            })
            return res.value
          }
        }
      }
      return a.value
    })
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

