import { map, join, reduce, pipe } from 'lodash/fp'  


export const tuple = (generator, val) => pipe(
    map(generator),
    join(','),
    str => `[${str}]`
)(val)

export const list = tuple


export const record = (generator, val) => pipe(
    reduce(generator)([]),
    join(','),
    str => `{${str}}`
)(val)

export const property = (generator, { id, value }) => `${generator(id)}.${generator(value)}`