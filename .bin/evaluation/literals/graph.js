"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = void 0;

var _evaluation = require("../evaluation");

const create = ({
  type,
  value
}, scope) => ({
  type,
  value: value.map(pat => (0, _evaluation.evaluate)(pat, scope)).flatMap(({
    value
  }) => value.subPatterns),
  closure: scope
});

exports.create = create;