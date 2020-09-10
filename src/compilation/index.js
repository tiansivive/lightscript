import { pipe, get } from 'lodash/fp'

import * as Literals from './literals/index'
import * as OP from './operations/index'
import * as FN from './functions/index'
import * as CF from './control-flow/index'

const assignment = ({ id, value, decorator }, scope) => {

  if(scope.identifiers.includes(id.value)) throw `Identifier "${id.value}" already defined. Cannot reassign identifiers to new values`

  const updatedScope = { ...scope, identifiers: [...scope.identifiers, id.value] }
  const compiled = compile(updatedScope)(value)
  return {
    value: `const ${id.value} = ${compiled.value}`,
    scope: updatedScope
  }
}


const property = val => val

export const compile = scope => expr => {
  if(process.env.DEBUG) console.log('compiling:', expr.type)

  const next = pipe(compile(scope), get('value'))
  
  switch (expr.type) {
    case 'literal':
    case 'control-flow':
    case 'expression':
      return compile(scope)(expr.value)
    case 'parenthesis':  
      const res = compile(scope)(expr.value)
      return { value: `(${res.value})`, scope: res.scope }

    case 'boolean':
    case 'number':
      return { value: expr.value, scope }
    case 'string':
      return { value: `"${expr.value}"`, scope }
    case 'tuple':
      return { value:  Literals.tuple(next, expr.value), scope }
    case 'list':
      return { value: Literals.list(next, expr.value), scope }
    case 'record':
      return { value: Literals.record(next, expr.value), scope }
    case 'property':
      return { value: Literals.property(next, expr), scope }
   
    case 'identifier': 
      return { value: expr.value, scope }
    case 'assignment':
      return assignment(expr, scope)

    case 'math':
    case 'logical':
    case 'conditional':
      return { value: OP.jsOp(next, expr), scope }
    case 'concatenation':
      return { value: OP.concatenation(next, expr), scope }
    case 'composition':
      return { value: OP.composition(next, expr), scope }


    case 'function':
      return { value: FN.makeFn(next, expr), scope }
    case 'function-application':
      return { value: FN.applyFn(next, expr), scope }
      
    case 'if-then-else':
      return { value: CF.ifThenElse(next, expr), scope }
    case 'match':
      return { value: CF.patternMatching(next, expr), scope }
    
    // case 'import':
    //   return M.importer(expr, scope)  

    case 'script':

      const generator = (result, expression) => {
        const compiled = compile(result.scope)(expression)
        return {
          expressions: [...result.expressions, compiled.value],
          scope: compiled.scope
        }
      }

      const { expressions } = expr.expressions.reduce(generator, { expressions: [], scope })
      return expressions
    default:
      throw new Error(`Unrecognized type: ${expr.type}\n, in expr: ${JSON.stringify(expr)}`)
  }
}
