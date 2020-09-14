"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.property = exports.record = exports.list = exports.tuple = void 0;

var _fp = require("lodash/fp");

const tuple = (generator, val) => (0, _fp.pipe)((0, _fp.map)(generator), (0, _fp.join)(','), str => `[${str}]`)(val);

exports.tuple = tuple;
const list = tuple;
exports.list = list;

const makeObject = generator => (pairs, {
  key,
  value
}) => [...pairs, `${key}:${generator(value)}`];

const record = (generator, val) => (0, _fp.pipe)((0, _fp.reduce)(makeObject(generator))([]), (0, _fp.join)(','), str => `{${str}}`)(val);

exports.record = record;

const property = (generator, {
  context,
  value
}) => `${generator(context)}.${generator(value)}`;

exports.property = property;