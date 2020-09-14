


export const importer = ({ id, path }) => `import * as ${id.value} from '${path}'`


export const exporter = exports => exports
    ? `export {${exports.map(e => e.value).join(',')}}`
    : ''