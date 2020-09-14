"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transforms = void 0;
const transforms = {
  fromJS: (jsVal, scope, bindingContext) => {
    if (Array.isArray(jsVal)) return {
      type: 'list',
      value: jsVal
    };
    if (typeof jsVal === 'function') return {
      type: 'function',
      body: bindingContext ? jsVal.bind(bindingContext) : jsVal,
      foreign: true,
      args: Array(jsVal.length).fill(0).map((_, i) => `__${jsVal.name}__arg_${i}__`),
      closure: scope
    };
    if (typeof jsVal === 'object') return {
      type: 'record',
      value: jsVal
    };
    return {
      type: typeof jsVal,
      value: jsVal
    };
  },
  toJS: (val, scope) => {
    if (typeof val === 'function') return (...args) => {
      const bound = val.args.map((arg, i) => ({
        id: arg,
        value: args[i]
      }));
      const res = evaluate(val.body, {
        identifiers: scope.identifiers.filter(({
          id
        }) => !bound.some(a => a.id === id)).concat(bound)
      });
      return res.value;
    };
  }
};
exports.transforms = transforms;