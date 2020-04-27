import { evaluate } from './evaluation'
import { transforms } from './ffi'

export const importer = ({ id, path, foreign }, scope) => {

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
        foreign
      }])
    },
  }
}
// import foreign 'lodash' as Lo
// Lo.map [1,2] (x y -> x + y)