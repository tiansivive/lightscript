

import * as Literals from './literals/index'
import * as S from './scripts/scripts'

const assignment = ({ id, value, decorator }, scope) => {

  const result = compile(value, scope)
  const identifiers = decorator && result.value.type === 'function' 
    ? [
        { 
          id: id.value, 
          value: {
            ...result.value, 
            decorator: { 
              id: decorator.id, 
              value: decorator.value
            }
          }
        },
        ...scope.identifiers
      ]
    : [{ id: id.value, value: result.value, foreign: result.foreign }, ...scope.identifiers]

  return { value: result.value, scope: { identifiers } }
}


const property = val => val


export const compile = scope => expr => {
  if(process.env.DEBUG) console.log('compiling:', expr.type)
  
  switch (expr.type) {
    case 'literal':
    case 'control-flow':
    case 'parenthesis':         
    case 'expression':
      return compile(scope)(expr.value)

    case 'boolean':
    case 'number':
      return expr.value
    case 'string':
      return `"${expr.value}"`
    case 'tuple':
      const makeTuple = Literals.tuple(compile(scope))
      return makeTuple(expr.value)
    case 'list':
      const makeList = Literals.list(compile(scope))
      return makeList(expr.value)
    case 'record':
      const makeRecord = Literals.tuple(compile(scope))
      return makeRecord(expr.value)
    case 'property':
      return property(expr, scope)
   
    // case 'identifier': 
    //   return { value: I.find(expr.value, scope), scope }
    // case 'assignment':
    //   return assignment(expr, scope)

    // case 'math':
    //   return { value: OP.math(expr, scope), scope }
    // case 'logical':
    //   return { value: OP.logical(expr, scope), scope } 
    // case 'conditional':
    //   return { value: OP.conditional(expr, scope), scope }
    // case 'concatenation':
    //   return { value: OP.concatenation(expr, scope), scope }
    // case 'composition':
    //   return { value: OP.composition(expr, scope), scope }
    // case 'graph-query':
    //   return { value: GO.query(expr, scope), scope }
    // case 'graph-mutation':
    //   return { value: GO.mutation(expr, scope), scope }


    // case 'function':
    //   return FN.create(expr, scope)
    // case 'function-application':
    //   return FN.apply(expr.id, expr.params, scope)
      
    // case 'if-then-else':
    //   return CF.ifThenElse(expr, scope)
    // case 'match':
    //   return CF.patternMatching(expr, scope)
    
    // case 'import':
    //   return M.importer(expr, scope)  

    case 'script':

      return expr.expressions.map(compile(scope))
    default:
      throw new Error(`Unrecognized type: ${expr.type}\n, in expr: ${JSON.stringify(expr)}`)
  }
}
