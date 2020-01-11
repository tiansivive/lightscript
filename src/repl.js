import readline from 'readline'

import { Parser, Grammar } from 'nearley'
import { evaluate } from './evaluation'

import lightscript from '../grammar/lightscript'


const grammar = Grammar.fromCompiled(lightscript)
let scope = { identifiers: [] }
let parser = new Parser(grammar)


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


rl.on('line', line => {
    
  parser.feed(line)

  const ast = parser.results[0]
  const ambiguity = parser.results.length

  const res = evaluate(ast, scope)
  console.log(res.value[0])
  scope = res.scope
  parser = new Parser(grammar)
 
 
  if(process.env.DEBUG) console.log('scope:', res.scope)
})