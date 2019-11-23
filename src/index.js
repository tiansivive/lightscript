import { Parser, Grammar } from 'nearley'
import { readFileSync } from 'fs'

import { evaluate } from './evaluation'

import lightscript from '../grammar/lightscript'

// Create a Parser object from our grammar.
const parser = new Parser(Grammar.fromCompiled(lightscript))
const code = readFileSync('lang/test.ls').toString()

parser.feed(code)

const ast = parser.results[0]
const ambiguity = parser.results.length



const res = evaluate(ast, { identifiers: [] })

console.log('Ambiguity:', ambiguity)
console.log('AST')
console.log(ast)
console.log('Evaluated:')
console.log('scope:', res.scope)
console.log('results:', res.value)
