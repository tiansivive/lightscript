
import { evaluate } from '../evaluation'


const next = (_ => {
  let n = 0
  return _ => ++n
})()



export const create = (obj, scope) => obj.reduce((result, { key, value }) => ({ ...result, [key]: evaluate(value, scope).value }), {})


export const toCypher = (obj, scope) => {
  const label = ':Object'
  const id = `__id__object__${next()}`

  const object = `CREATE (o:Object { id: ${id} })`

  const rels = obj.map(({ key, value }) => `(o)-[:HAS]->(k:Key)-[:MAPS]->(v:Value) where k.name = ${key} and v.value = ${value}`)

  const cypher = `
    ${object}
    CREATE
    ${rels.join(',\n')};
  `

  return cypher
}