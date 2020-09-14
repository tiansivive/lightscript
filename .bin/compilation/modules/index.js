"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exporter = exports.importer = void 0;

const importer = ({
  id,
  path
}) => `import * as ${id.value} from '${path}'`;

exports.importer = importer;

const exporter = exports => exports ? `export {${exports.map(e => e.value).join(',')}}` : '';

exports.exporter = exporter;