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

console.log('Ambiguity:', ambiguity)
console.log('AST')
console.log(ast)

const res = evaluate(ast)

console.log('EVAL result = ', res)
