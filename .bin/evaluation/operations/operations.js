"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composition = exports.concatenation = exports.conditional = exports.logical = exports.math = void 0;

var _lodash = require("lodash");

var _evaluation = require("../evaluation");

const math = (expr, scope) => {
  const {
    value: left
  } = (0, _evaluation.evaluate)(expr.left, scope);
  if (typeof left !== 'number') throw new Error('Left side of math expression not a number');
  const {
    value: right
  } = (0, _evaluation.evaluate)(expr.right, scope);
  if (typeof right !== 'number') throw new Error('Right side of math expression not a number');

  switch (expr.operator) {
    case '+':
      return left + right;

    case '-':
      return left - right;

    case '*':
      return left * right;

    case '/':
      return left / right;
  }
};

exports.math = math;

const logical = ({
  expression,
  operator,
  ...expr
}, scope) => {
  if (operator === '!') {
    const {
      value
    } = (0, _evaluation.evaluate)(expression, scope);
    if (typeof value !== 'boolean') throw new Error('Trying to apply NOT operator on a non-boolean value');
    return !value;
  }

  const {
    value: left
  } = (0, _evaluation.evaluate)(expr.left, scope);
  if (typeof left !== 'boolean') throw new Error('Left side of logical expression not a boolean');
  const {
    value: right
  } = (0, _evaluation.evaluate)(expr.right, scope);
  if (typeof right !== 'boolean') throw new Error('Right side of logical expression not a boolean');

  switch (operator) {
    case '&&':
      return left && right;

    case '||':
      return left || right;
  }
};

exports.logical = logical;

const conditional = (expr, scope) => {
  const {
    value: left
  } = (0, _evaluation.evaluate)(expr.left, scope);
  const {
    value: right
  } = (0, _evaluation.evaluate)(expr.right, scope);

  if (expr.operator === '==') {
    if (typeof left !== typeof right) throw new Error(`Cannot compare value of type ${typeof left} with value of type ${typeof right}`);
    return (0, _lodash.isEqual)(left, right);
  }

  if (typeof left !== 'number') throw new Error('Left side of comparison expression not a number');
  if (typeof right !== 'number') throw new Error('Right side of comparison expression not a number');

  switch (expr.operator) {
    case '<':
      return left < right;

    case '>':
      return left > right;

    case '<=':
      return left <= right;

    case '>=':
      return left >= right;
  }
};

exports.conditional = conditional;

const concatenation = (expr, scope) => {
  const {
    value: left
  } = (0, _evaluation.evaluate)(expr.left, scope);
  const {
    value: right
  } = (0, _evaluation.evaluate)(expr.right, scope);
  if (typeof left !== typeof right) throw new Error(`Cannot concatenate value of type '${typeof left}' with value of type '${typeof right}'`);
  if (typeof left !== 'object' && typeof left !== 'string') throw new Error(`Cannot concatenate values of type '${typeof left}'`);
  if (Array.isArray(left)) return [...left, ...right];

  switch (typeof left) {
    case 'string':
      return left + right;

    case 'object':
      return { ...left,
        ...right
      };
  }
};

exports.concatenation = concatenation;

const composition = (expr, scope) => {
  const {
    value: left
  } = (0, _evaluation.evaluate)(expr.left, scope);
  const {
    value: right
  } = (0, _evaluation.evaluate)(expr.right, scope);
  if (!left.type || left.type !== 'function' && left.type !== 'composed-function') throw new Error(`Cannot use composition with left type: ${left.type || typeof left}`);
  if (!right.type || right.type !== 'function' && right.type !== 'composed-function') throw new Error(`Cannot use composition with right type: ${right.type || typeof right}`); // f = x -> x + 1
  // g = y -> y + 1
  // fg = f >> g

  return {
    type: 'function',
    composed: true,
    args: left.args,
    first: expr.operator === '>>' ? left : right,
    second: expr.operator === '>>' ? right : left
  };
};

exports.composition = composition;