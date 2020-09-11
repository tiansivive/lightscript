import { pipe, map, join } from 'lodash/fp'


export const makeFn = (generator, { args, value }) => {
    const input = args.join(',')
    const output = generator(value)

    return `(${input}) => ${output}`
}


export const applyFn = (generator, { id, params }) => {
    const generateParamList = pipe(
        map(generator),
        join(',')
    )

    const fn = generator(id)
    
    return `${fn}(${generateParamList(params)})`
} 
