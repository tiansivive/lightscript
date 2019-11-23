
import { evaluate } from '../evaluation'


export const create = expr => expr

export const apply = (id, params, scope) => {

  //const name = `fn-${id.value}` || 'fn-anonymous' 
  const { value: fn } = evaluate(id, scope)


  const identifiers = params.map((p, i) => ({ id: fn.args[i], value: evaluate(p, scope).value }))
  const res = evaluate(fn.value, { identifiers: [...scope.identifiers, ...identifiers] })

  return { value: res.value, scope }
}