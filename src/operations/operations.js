import { isEqual } from 'lodash'
import { evaluate } from '../evaluation'


export const math = (expr, scope) => {
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

export const logical = ({ expression, operator, ...expr}, scope) => {

  if(operator === '!') {
    const { value } = evaluate(expression, scope)
    if (typeof value !== 'boolean') throw new Error('Trying to apply NOT operator on a non-boolean value')

    return !value
    
  } 

  const { value: left } = evaluate(expr.left, scope)
  if (typeof left !== 'boolean') throw new Error('Left side of logical expression not a boolean')
  const { value: right } = evaluate(expr.right, scope)
  if (typeof right !== 'boolean') throw new Error('Right side of logical expression not a boolean')

  switch (operator) {
    case '&&':
      return left && right
    case '||':
      return left || right
  }
}

export const conditional = (expr, scope) => {

  const { value: left } = evaluate(expr.left, scope)
  const { value: right } = evaluate(expr.right, scope)
  if(expr.operator === '=='){

    if (typeof left !== typeof right) throw new Error(`Cannot compare value of type ${typeof left} with value of type ${typeof right}`)

    return isEqual(left, right)
  }

  if (typeof left !== 'number') throw new Error('Left side of comparison expression not a number')
  if (typeof right !== 'number') throw new Error('Right side of comparison expression not a number')

  switch (expr.operator) {
    case '<':
      return left < right
    case '>':
      return left > right
    case '<=':
      return left <= right
    case '>=':
      return left >= right
  }
}


export const concatenation = (expr, scope) => {

  const { value: left } = evaluate(expr.left, scope)
  const { value: right } = evaluate(expr.right, scope)

  if (typeof left !== typeof right) throw new Error(`Cannot concatenate value of type '${typeof left}' with value of type '${typeof right}'`)
  if (typeof left !== 'object' && typeof left !== 'string') throw new Error(`Cannot concatenate values of type '${typeof left}'`)

  if(Array.isArray(left)) return [...left, ...right]

  switch (typeof left) {
    case 'string':
      return left + right
    case 'object':
      return { ...left, ...right }
  }
}
