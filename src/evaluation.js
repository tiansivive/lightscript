import * as I from './identifiers'
import * as R from './literals/record'
import * as L from './literals/list'
import * as T from './literals/tuple'
import * as G from './literals/graph'
import * as GP from './literals/pattern'
import * as FN from './functions/definition'
import * as CF from './control-flow/cf'
import * as OP from './operations/operations'
import * as GO from './operations/graph'

import * as M from './modules'
import * as S from './scripts'

import { transforms } from './ffi'

/**
 * 
 * @param { Expression } expr 
 * @param { Scope } scope 
 * 
 * @return {{ value: *, scope: Scope }}
 */
const assignment = ({ id, value, decorator }, scope) => {

  const result = evaluate(value, scope)
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


const property = ({ id, value, context, foreign }, scope) => {

  const evaluatedContext = evaluate(context, scope).value
  const val = evaluatedContext.value[value.value]

  if(evaluatedContext.foreign && !val.type){
    // TODO:
    return { value: transforms.fromJS(val, scope, evaluatedContext.value), scope }  
  }

  return { value: val, scope } 
}




/**
 * 
 * @param { Expression } expr 
 * @param { Scope } scope 
 * 
 * @return {{ value: *, scope: Scope }}
 */
export const evaluate = (expr, scope) => {
  if(process.env.DEBUG) console.log('evaluating:', expr.type)
  
  switch (expr.type) {
    case 'literal':
    case 'control-flow':
    case 'parenthesis':         
    case 'expression':
      return evaluate(expr.value, scope)

    case 'boolean':
    case 'number':
    case 'string':
      return { value: expr.value, scope }
    case 'tuple':
      return { value: T.create(expr.value, scope), scope }
    case 'list':
      return { value: L.create(expr.value, scope), scope }
    case 'record':
      return { value: R.create(expr.value, scope), scope }
    case 'property':
      return property(expr, scope)
    // case 'graph':
    //   return { value: G.create(expr, scope), scope } 
    // case 'graph-pattern': 
    //   return { value: GP.create(expr, scope), scope }  
    // case 'graph-node': 
    //   return { value: GP.node(expr), scope }  
    // case 'graph-edge': 
    //   return { value: GP.relationship(expr), scope }  
   
    case 'identifier': 
      return { value: I.find(expr.value, scope), scope }
    case 'assignment':
      return assignment(expr, scope)

    case 'math':
      return { value: OP.math(expr, scope), scope }
    case 'logical':
      return { value: OP.logical(expr, scope), scope } 
    case 'conditional':
      return { value: OP.conditional(expr, scope), scope }
    case 'concatenation':
      return { value: OP.concatenation(expr, scope), scope }
    case 'composition':
      return { value: OP.composition(expr, scope), scope }
    case 'graph-query':
      return { value: GO.query(expr, scope), scope }
    case 'graph-mutation':
      return { value: GO.mutation(expr, scope), scope }


    case 'function':
      return FN.create(expr, scope)
    case 'function-application':
      return FN.apply(expr.id, expr.params, scope)
      
    case 'if-then-else':
      return CF.ifThenElse(expr, scope)
    case 'match':
      return CF.patternMatching(expr, scope)
    
    case 'import':
      return M.importer(expr, scope)  

    case 'script':
      return S.script(expr, scope)
    default:
      throw new Error(`Unrecognized type: ${expr.type}\n, in expr: ${JSON.stringify(expr)}`)
  }
}
