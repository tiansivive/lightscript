import { pipe, map, get, join } from 'lodash/fp'


export const makeFn = (generator, { args, value }) => {
    const input = args.join(',')
    const { value: output} = generator(value)

    return `(${input}) => ${output}`
}




export const applyFn = (generator, { id, params }) => {
    
    const generateParamList = pipe(
        map( pipe(generator, get('value')) ),
        join(',')
    )
    
    return `${id.value}(${generateParamList(params)})`
} 
    