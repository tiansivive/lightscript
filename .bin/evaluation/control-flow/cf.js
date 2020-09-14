"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patternMatching = exports.ifThenElse = void 0;

var _evaluation = require("../evaluation");

const ifThenElse = (expr, scope) => (0, _evaluation.evaluate)(expr.condition, scope).value ? (0, _evaluation.evaluate)(expr.truthy, scope) : (0, _evaluation.evaluate)(expr.falsy, scope);

exports.ifThenElse = ifThenElse;

const patternMatching = ({
  expression,
  patterns,
  otherwise
}, scope) => {
  const val = (0, _evaluation.evaluate)(expression, scope).value;
  const context = { ...scope
  };
  const branch = patterns.find(({
    evaluation
  }) => {
    if (evaluation.type === 'identifier') {
      const exists = scope.identifiers.find(({
        id
      }) => id === evaluation.value);
      if (exists) throw new Error(`Trying to redeclare identifier ${evaluation.value}`);
      context.identifiers.push({
        id: evaluation.value,
        value: val
      });
      return true;
    }

    return (0, _evaluation.evaluate)(evaluation, context).value === val;
  });

  if (!branch) {
    if (!otherwise) throw new Error(`Pattern matching is not comprehensive, perhaps you forgot to add an 'otherwise' clause?`);
    return {
      value: (0, _evaluation.evaluate)(otherwise, context).value,
      scope
    };
  } else return {
    value: (0, _evaluation.evaluate)(branch.value, context).value,
    scope
  };
};

exports.patternMatching = patternMatching;