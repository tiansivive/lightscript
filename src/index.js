import { Parser, Grammar } from 'nearley'
import lightscript from '../grammar/lightscript'

// Create a Parser object from our grammar.
const parser = new Parser(Grammar.fromCompiled(lightscript))

parser.feed('true\n\none')

console.log(parser.results)


