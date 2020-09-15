import glob from 'glob'
import { readFile, writeFile } from 'fs'
import { Parser, Grammar } from 'nearley'

import { compile } from './compilation/index'
import lightscript from '../bin/lightscript'


// Create a Parser object from our grammar.

const initialScope = { identifiers: [] }

process.argv.forEach(a => console.log(a))

const directory = process.cwd() + '/' + process.argv[2]

const outputDir = (_ => {
   const i = process.argv.findIndex(arg => arg.match('-o'))

   if(i < 0) return directory
   return process.cwd()  + '/' + process.argv[i + 1]
})()

console.log('dir', directory)
console.log('outDir', outputDir)

const replaceExtension = file => file.replace('.ls', '.js')

glob(`**/*.ls`, { cwd: directory }, (e, files) => {

    console.log('files', files)
    const promises = files.map(file => {

        console.log('compiling', file)
        return new Promise((resolve, reject) => readFile(directory + '/' + file, (err, data) => {
            if(err) return reject(err)

            const parser = new Parser(Grammar.fromCompiled(lightscript))
            const code = data.toString()
            parser.feed(code)
            const ast = parser.results[0]
    
            const generate = compile(initialScope)
            const js = generate(ast)
    
            writeFile(outputDir + '/' + replaceExtension(file), js.join(';\n') + ';', err => (err ? reject(err) : resolve(true)))
   
        })).then(_ => console.log('FINISHED', file))
    })

    Promise.all(promises).then(_ => console.log('FINISHED COMPILING!'))
  })

