import { map, join, reduce, pipe } from 'lodash/fp'  


export const tuple = (generator, val) => pipe(
    map(generator),
    join(','),
    str => `[${str}]`
)(val)

export const list = tuple


const makeObject = generator => (pairs, { key, value }) => [...pairs, `${key}:${generator(value)}`]

export const record = (generator, val) => pipe(
    reduce(makeObject(generator))([]),
    join(','),
    str => `{${str}}`
)(val)

export const property = (generator, { context, value }) => `${generator(context)}.${generator(value)}`