import { evaluate } from './evaluation'
import { transforms } from './ffi'



const importFromJS = (id, path, scope) => {

  const module = require(path)
  const value = Object
    .keys(module)
    .reduce((obj, key) => ({ 
      ...obj, 
      [key]: {
        jsVal: module[key],
        ...transforms.fromJS(module[key])
      }
    }), {})

  return { 
    value,
    scope: {
      identifiers: scope.identifiers.concat([{ 
        id: id.value, 
        value, 
        foreign: true
      }])
    },
  }
}

export const importer = ({ id, path, foreign }, scope) => {

  if(foreign) return importFromJS(id, path, scope)

  throw new Error('native module import not supported yet')
}
