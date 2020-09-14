"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = void 0;

var _evaluation = require("../evaluation");

const create = (list, scope) => list.map(e => (0, _evaluation.evaluate)(e, scope).value);

exports.create = create;