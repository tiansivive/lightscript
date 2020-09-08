import { reduce } from 'lodash/fp'


export const script = (compilerFn, scope) => reduce( compilerFn )({ expressions: [], scope })
