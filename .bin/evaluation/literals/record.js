"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = void 0;

var _evaluation = require("../evaluation");

const create = (obj, scope) => obj.reduce((result, {
  key,
  value
}) => ({ ...result,
  [key]: (0, _evaluation.evaluate)(value, scope).value
}), {});

exports.create = create;