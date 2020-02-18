
import { evaluate } from '../evaluation'



export const create = ({ type, value }, scope) => ({ 
  type, 
  value: value.map(({ first, second, edge }, i) => `${node(first)}${relationship(edge)}${ i === value.length -1 ? node(second) : ''}`).join('')
})

export const node = ({ value }, scope) => {
  if(value.type !== 'identifier') throw new Error('Node in pattern is not an Identifier.')
  return `(${value.value})`
}


export const relationship = ({ direction, value }, scope) => {

  if(value.type !== 'identifier') throw new Error('Relationship in pattern is not an Identifier.')
  switch(direction){
    case 'outgoing':
      return `-[${value.value}]->`
    case 'incoming':
      return `<-[${value.value}]-`
    case 'bilateral':
      return `-[${value.value}]-`
  }
}