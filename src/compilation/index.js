import { pipe, get } from 'lodash/fp'

import * as Literals from './literals/index'
import * as OP from './operations/index'
import * as FN from './functions/index'
import * as CF from './control-flow/index'
import * as M from './modules/index'


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
      return OP.assignment(expr, compile, scope)

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
    
    case 'import':
      return { value: M.importer(expr), scope }

    case 'script':

      const generator = (result, expression) => {
        const compiled = compile(result.scope)(expression)
        return {
          expressions: [...result.expressions, compiled.value],
          scope: compiled.scope
        }
      }

      const { expressions } = expr.expressions.reduce(generator, { expressions: [], scope })
      const imports = expr.module.imports 
        ? expr.module.imports.map(next)
        : []

      return [...imports, ...expressions, M.exporter(expr.module.exports)]
    default:
      throw new Error(`Unrecognized type: ${expr.type}\n, in expr: ${JSON.stringify(expr)}`)
  }
}
