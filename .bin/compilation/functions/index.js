"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyFn = exports.makeFn = void 0;

var _fp = require("lodash/fp");

const makeFn = (generator, {
  args,
  value
}) => {
  const input = args.join(',');
  const output = generator(value);
  return `(${input}) => ${output}`;
};

exports.makeFn = makeFn;

const applyFn = (generator, {
  id,
  params
}) => {
  const generateParamList = (0, _fp.pipe)((0, _fp.map)(generator), (0, _fp.join)(','));
  const fn = generator(id);
  return `${fn}(${generateParamList(params)})`;
};

exports.applyFn = applyFn;