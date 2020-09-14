"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assignment = exports.composition = exports.concatenation = exports.jsOp = void 0;

const jsOp = (generator, expr) => {
  const left = generator(expr.left);
  const right = generator(expr.right);
  return `${left} ${expr.operator} ${right}`;
};

exports.jsOp = jsOp;

const concatenation = (generator, expr) => {
  const left = generator(expr.left);
  const right = generator(expr.right);
  return `((a, b) => {
        if(Array.isArray(left)){
          return [...a, ...b]);
        }
        if(typeof a === 'string'){
          return a + b;
        }
        return { ...a, ...b };
      })(${left}, ${right})`;
};

exports.concatenation = concatenation;

const composition = (generator, expr) => {
  const left = generator(expr.left);
  const right = generator(expr.right);

  switch (expr.operator) {
    case '<<':
      return `((...args) => { return ${left}(${right}(...args)) })`;

    case '>>':
      return `((...args) => { return ${right}(${left}(...args)) })`;
  }
};

exports.composition = composition;

const assignment = ({
  id,
  value,
  decorator
}, compile, scope) => {
  if (scope.identifiers.includes(id.value)) throw `Identifier "${id.value}" already defined. Cannot reassign identifiers to new values`;
  const updatedScope = { ...scope,
    identifiers: [...scope.identifiers, id.value]
  };
  const compiled = compile(updatedScope)(value);
  return {
    value: `const ${id.value} = ${compiled.value}`,
    scope: updatedScope
  };
};

exports.assignment = assignment;