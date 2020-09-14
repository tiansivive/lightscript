"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.script = void 0;

var _evaluation = require("./evaluation");

var _lodash = require("lodash");

const script = (s, scope) => {
  const initialScope = s.module.imports && s.module.imports.length > 0 ? (0, _evaluation.evaluate)(s.module.imports[0], scope).scope : scope;
  const result = s.expressions.reduce(({
    value,
    scope
  }, expression) => {
    const res = (0, _evaluation.evaluate)(expression, scope);
    return {
      value: [...value, res.value],
      scope: res.scope
    };
  }, {
    value: [],
    scope: initialScope
  });
  const exports = s.module.exports ? result.scope.identifiers.filter(({
    id
  }) => s.module.exports.includes(id)) : result.scope.identifiers;
  return { ...result,
    scope: {
      identifiers: exports
    }
  };
};

exports.script = script;