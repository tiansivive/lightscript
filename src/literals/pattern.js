
import { evaluate } from '../evaluation'


const getNextId = (() => {
  let n = 0, r = 0
  return type => type === 'node' ? ++n : ++r
})()


export const create = ({ type, value }, scope) => ({ 
  type, 
  value: value.value.map(({ first, second, edge }) => ({ 
    first: node(first, scope),
    second: node(second, scope),
    edge: relationship(edge, scope)
  }))
})

export const node = (node, scope) => {
  const delayEvaluation = () => evaluate(node, scope)
  console.log('node:', node)
  const id = node.type === 'identifier' ? node.value : `__node__id__${getNextId('node')}__`
  return { type: 'node', id, value: delayEvaluation }
}


export const relationship = (rel, scope) => {
  const delayEvaluation = () => evaluate(rel, scope)

  const id = rel.type === 'identifier' ? rel.value : `__rel__id__${getNextId('rel')}__`
  return { type: 'relationship', id, value: delayEvaluation }
}