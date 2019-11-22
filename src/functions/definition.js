import { zipObject } from 'lodash'

import { popScope, pushScope, addToCurrentScope, find } from '../identifiers'
import { evaluate } from '../evaluation'
import * as I from '../identifiers'



export const create = expr => expr


export const apply = (id, params) => {

  const name = `fn-${id.value}` || 'fn-anonymous' 
  const fn = evaluate(id)
  const evaluatedArguments = params.map(p => evaluate(p))

  pushScope(name)
  fn.args.forEach((a, i) => addToCurrentScope(a, evaluatedArguments[i]));
  const res = evaluate(fn.value)
  popScope(name)

  return res
}