import { popScope, pushScope, addToCurrentScope, find } from './identifiers'
import * as O from './literals/object'
import * as L from './literals/list'
import * as T from './literals/tuple'
import * as FN from './functions/definition'

import { map } from 'lodash/fp'

const assignment = ({ id, value }) => {
  const val = evaluate(value)
  addToCurrentScope(id.value, val)
  return val
}

const math = expr => {
  const left = evaluate(expr.left)
  if (typeof left !== 'number') throw new Error('Left side of math expression not a number')
  const right = evaluate(expr.right)
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

export const evaluate = expr => {
  console.log('evaluating:', expr.type)
  switch (expr.type) {
    case 'boolean':
    case 'number':
    case 'string':
      return expr.value;
    case 'tuple':
      return T.create(expr.value)
    case 'list':
      return L.create(expr.value)
    case 'record':
      return O.create(expr.value)
    case 'property':
      return evaluate(expr.context)[expr.value.value]  
    case 'identifier':
      return find(expr.value)
    case 'assignment':
      return assignment(expr)

    case 'math':
      return math(expr)

    case 'literal':         
    case 'expression':
      return evaluate(expr.value)

    case 'function':
      return FN.create(expr)

    case 'function-application':
      return FN.apply(expr.id, expr.params)

    case 'script':
      return expr.val.map(evaluate)
  }
}
