import { evaluate } from '../evaluation'

const isDirected = pat => pat.split('').some(c => c === '<' || c === '>')
const isOutgoing = pat => pat.split('').some(c => c === '>')
const isIncoming = pat => pat.split('').some(c => c === '<')


const getNodes = pat => pat.match(/\((\:|\w)+\)/gi)
const getRels = pat => pat.match(/\[(\:|\w)+\]/gi)

const reverse = pat => {
  const nodes = getNodes(pat)
  const rel = getRels(pat)

  if(isIncoming(pat)) return `${nodes[1]}-${rel}->${nodes[0]}`
  if(isOutgoing(pat)) return `${nodes[1]}<-${rel}-${nodes[0]}`
  if(!isDirected(pat)) return `${nodes[1]}-${rel}-${nodes[0]}`

  throw new Error('Unrecognized pattern directionality')
}

const matchAux = (pat1, pat2) => {
  const nodes1 = getNodes(pat1).map(node => node.split(':')).map(([, ...rest]) => rest)
  const rel1 = getRels(pat1).map(rel => rel.split(':')).map(([, ...rest]) => rest)

  const nodes2 = getNodes(pat2).map(node => node.split(':')).map(([, ...rest]) => rest)
  const rel2 = getRels(pat2).map(rel => rel.split(':')).map(([, ...rest]) => rest)

  if(!nodes1.every((n, i) => n.length === 0 || n.some(label => nodes2[i].includes(label)))) return false
  if(!rel1.every((r, i) => r.length === 0 || n.some(type => nodes2[i].includes(type)))) return false

  if(isOutgoing(pat1) && isIncoming(pat2)) return false
  if(isIncoming(pat1) && isOutgoing(pat2)) return false

  return true
}

const match = pat1 => pat2 => matchAux(pat1, pat2) || matchAux(pat1, reverse(pat2))

const pats = 
  [ '(a:Label)-[r]->(b:Some)'
  , '(c)<-[r]-(d:Some)' 
  , '(e:Label)-[r]-(f:Other)'
  , '(g:Some)-[r]->(h)'
  ]

const reversed = pats.map(reverse)  

pats.forEach(p => console.log(p))
reversed.forEach(p => console.log(p))
reversed.map(reverse).forEach(p => console.log(p))

const matches = 
  [ match('(a)-[r]-(b)')
  , match('(a:Label)-[r]-(b)')
  , match('(a:Label)-[r]->(b)')
  , match('(a:Other)-[r]-(b:Label)')
  , match('(a:Some)-[r]->(b)')
  , match('(a)-[r]->(b:Some)')
  , match('(a:Label)-[r]-(b:Label)')
  ]

matches.map(f => pats.map(f)).forEach((result, i) => console.log('result', i, ':', result))




export const query = ({ left, right }, scope) => {

  const { value: evaluatedGraph} = evaluate(left, scope)
  if(evaluatedGraph.type !== 'graph') throw new Error('Tried to query something other than a graph') 

  const { value: evaluatedPattern} = evaluate(right, scope)
  if(evaluatedPattern.type !== 'graph-pattern') throw new Error('Tried to query with something other than a pattern') 

  const matches = evaluatedPattern.subPatterns
    .map(({ value }) => match(value)) 
  
  const found = matches.every(fn => evaluatedGraph.value.some(({ value }) => fn(value) ))

  if(!found) return  { type: 'graph', value: [], closure: scope }

  const subGraph = evaluatedGraph.value.filter(({ value }) => matches.some(fn => fn(value))) 

  return { type: 'graph', value: subGraph, closure: scope }
}

export const mutation = (expr, scope) => {

}

// const query = (graph, query) => {

//   const pats = graph.value.filter(pat => query.subPatterns.some(matches(pat)))


// }


// var a,b, c


// const g = (a)-[b]->(c)

// g |- (x)--(y)


// g |- 
