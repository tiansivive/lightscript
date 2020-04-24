import { Parser, Grammar } from 'nearley'
import { range } from 'lodash'
import ls from '../bin/lightscript'
import { evaluate } from '../src/evaluation'


describe('Parse primitive data types', () => {

  let parser = null
  let grammar = Grammar.fromCompiled(ls)
  let scope = { identifiers: [] }

  beforeEach(() => parser = new Parser(grammar))

  it('should parse an integer', () => {
    const ints = [1, 10, 100, 1000, 1000000, 2, 21, 201, 2021, 2020202]

    ints.forEach(i => {
      parser = new Parser(grammar)  
      parser.feed(i.toString())

      const ast = parser.results[0]
      const ambiguity = parser.results.length
      const result = evaluate(ast)

      expect(ast).toBeDefined()
      expect(result).toBeDefined()
      expect(ambiguity).toBe(1)
      expect(result.value[0]).toBe(i)
    })
  })

  it('should parse a float', () => {
    const floats = [1.1, 10.0, 100.2, 1000.44, 1000000.01, 2.21, 21.22, 201.12345, 2021.657, 2020202.09]

    floats.forEach(f => {
      parser = new Parser(grammar)  
      parser.feed(f.toString())

      const ast = parser.results[0]
      const ambiguity = parser.results.length
      const result = evaluate(ast, scope)

      expect(ast).toBeDefined()
      expect(result).toBeDefined()
      expect(ambiguity).toBe(1)
      expect(result.value[0]).toBe(f)
    })
  })

    it('should parse a string', () => { 
      // TODO: string break when you have an ' inside the string. it gets parsed as part of the string rather than a delimiter
    const str = '\'this is a string\''

    parser.feed(str)

    const ast = parser.results[0]
    const ambiguity = parser.results.length
    const result = evaluate(ast, scope)

      expect(ast).toBeDefined()
      expect(result).toBeDefined()
      expect(ambiguity).toBe(1)
      expect(result.value[0]).toBe('this is a string')
    
  })

      it('should parse arrays', () => { 
    const arrs = [ '[]', '[1,2,3]', "['some string']" ] 
    const output = [ [], [1,2,3], ['some string'] ]

    arrs.forEach((a, i) => {
      parser = new Parser(grammar)  
      parser.feed(a)

      const ast = parser.results[0]
      const ambiguity = parser.results.length
      const result = evaluate(ast, scope)

      expect(ast).toBeDefined()
      expect(result).toBeDefined()
      expect(ambiguity).toBe(1)
      expect(result.value[0]).toEqual(output[i])
    })
    
  })

})