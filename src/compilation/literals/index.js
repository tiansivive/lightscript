import { map, join, reduce, pipe } from 'lodash/fp'  



export const tuple = evaluator => pipe(
    map(evaluator),
    join(','),
    str => `[${str}]`
)

export const list = tuple


export const record = evaluator => pipe(
    reduce(evaluator)([]),
    join(','),
    str => `{${str}}`
)