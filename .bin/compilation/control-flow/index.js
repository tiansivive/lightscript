"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patternMatching = exports.ifThenElse = void 0;

const ifThenElse = (generator, expr) => {
  const cond = generator(expr.condition);
  const t = generator(expr.truthy);
  const f = generator(expr.falsy);
  return `(${cond} ? ${t} : ${f}))`;
};

exports.ifThenElse = ifThenElse;

const patternMatching = (generator, {
  expression,
  patterns,
  otherwise
}) => {
  const e = generator(expression);
  const o = generator(otherwise);

  const transform = ({
    evaluation,
    value
  }) => `case ((${generator(evaluation)}) === __val__): return ${generator(value)};`;

  const branches = patterns.map(transform).join('');
  return `(_ => { 
        const __val__ = ${e};
        switch(true){ ${branches} default: return ${o} }
    })()`;
};

exports.patternMatching = patternMatching;