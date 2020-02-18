
import { evaluate } from '../evaluation'



export const create = ({ type, value }, scope) => ({
  type, 
  value: value.map(({ first, second, edge }, i) => `${node(first)}${relationship(edge)}${ i === value.length -1 ? node(second) : ''}`).join(''),
  subPatterns: value.map(({ first, second, edge }, i) => `${node(first)}${relationship(edge)}${node(second)}`),
  closure: scope
})


export const node = ({ value, labels }, scope) => {
  if(value.type !== 'identifier') throw new Error('Node in pattern is not an Identifier.')
  return `(${[value.value, ...labels].join(':')})`
}


export const relationship = ({ direction, value, labels }, scope) => {

  if(value.type !== 'identifier') throw new Error('Relationship in pattern is not an Identifier.')
  switch(direction){
    case 'outgoing':
      return `-[${[value.value, ...labels].join(':')}]->`
    case 'incoming':
      return `<-[${[value.value, ...labels].join(':')}]-`
    case 'bilateral':
      return `-[${[value.value, ...labels].join(':')}]-`
  }
}