import { evaluate } from './evaluation'
import { transforms } from './ffi'

import { Parser, Grammar } from 'nearley'
import { readFileSync } from 'fs'

import lightscript from '../bin/lightscript'

const parseFile = (file, scope) => {

  const parser = new Parser(Grammar.fromCompiled(lightscript))
  const code = readFileSync(file).toString()
  
  parser.feed(code)
  
  const ast = parser.results[0]
  const ambiguity = parser.results.length
  
  const res = evaluate(ast, scope)

  if(process.env.DEBUG){
    console.log(`-------------- BEGIN DEBUG FILE PARSING: ${file} --------------`)
    console.log('Ambiguity:', ambiguity)
    console.log('AST')
    console.log(ast)
    console.log('Evaluated:')
    console.log('scope:', res.scope)
    console.log('results:', res.value)

    if(ambiguity > 1) console.log('Parsing is ambiguous, make sure everything is OK! maybe throw some errors?')
    console.log(`-------------- END DEBUG FILE PARSING: ${file} --------------`)
  }

  return res
}



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

  const imported = parseFile(path, scope)
  const alias = imported.scope.identifiers.reduce((a, { id, value }) => ({ ...a, [id]: value }), {})

  return { 
    value: imported.value, 
    scope: { 
      identifiers: scope.identifiers.concat([{ 
        id: id.value, 
        value: alias 
      }])
    }
  }
}
