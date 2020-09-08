import { readFileSync, writeFileSync } from 'fs'

import { Parser, Grammar } from 'nearley'
import { compile } from './compilation/index'

import lightscript from '../bin/lightscript'


// Create a Parser object from our grammar.
const parser = new Parser(Grammar.fromCompiled(lightscript))
const code = readFileSync('lang/Examples/test.ls').toString()

parser.feed(code)

const ast = parser.results[0]
const ambiguity = parser.results.length

const initialScope = { identifiers: [] }
const generate = compile(initialScope)
const js = generate(ast)

console.log('Ambiguity:', ambiguity)
console.log('AST')
console.log(ast)
console.log('Compiled:')


writeFileSync('out/test.js', js.join(';\n') + ';')
console.log('Finished Compiling JS!')


if(ambiguity > 1) console.log('Parsing is ambiguous, make sure everything is OK! maybe throw some errors?')
