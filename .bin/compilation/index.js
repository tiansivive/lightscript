"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compile = void 0;

var _fp = require("lodash/fp");

var Literals = _interopRequireWildcard(require("./literals/index"));

var OP = _interopRequireWildcard(require("./operations/index"));

var FN = _interopRequireWildcard(require("./functions/index"));

var CF = _interopRequireWildcard(require("./control-flow/index"));

var M = _interopRequireWildcard(require("./modules/index"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const compile = scope => expr => {
  if (process.env.DEBUG) console.log('compiling:', expr.type);
  const next = (0, _fp.pipe)(compile(scope), (0, _fp.get)('value'));

  switch (expr.type) {
    case 'literal':
    case 'control-flow':
    case 'expression':
      return compile(scope)(expr.value);

    case 'parenthesis':
      const res = compile(scope)(expr.value);
      return {
        value: `(${res.value})`,
        scope: res.scope
      };

    case 'boolean':
    case 'number':
      return {
        value: expr.value,
        scope
      };

    case 'string':
      return {
        value: `"${expr.value}"`,
        scope
      };

    case 'tuple':
      return {
        value: Literals.tuple(next, expr.value),
        scope
      };

    case 'list':
      return {
        value: Literals.list(next, expr.value),
        scope
      };

    case 'record':
      return {
        value: Literals.record(next, expr.value),
        scope
      };

    case 'property':
      return {
        value: Literals.property(next, expr),
        scope
      };

    case 'identifier':
      return {
        value: expr.value,
        scope
      };

    case 'assignment':
      return OP.assignment(expr, compile, scope);

    case 'math':
    case 'logical':
    case 'conditional':
      return {
        value: OP.jsOp(next, expr),
        scope
      };

    case 'concatenation':
      return {
        value: OP.concatenation(next, expr),
        scope
      };

    case 'composition':
      return {
        value: OP.composition(next, expr),
        scope
      };

    case 'function':
      return {
        value: FN.makeFn(next, expr),
        scope
      };

    case 'function-application':
      return {
        value: FN.applyFn(next, expr),
        scope
      };

    case 'if-then-else':
      return {
        value: CF.ifThenElse(next, expr),
        scope
      };

    case 'match':
      return {
        value: CF.patternMatching(next, expr),
        scope
      };

    case 'import':
      return {
        value: M.importer(expr),
        scope
      };

    case 'script':
      const generator = (result, expression) => {
        const compiled = compile(result.scope)(expression);
        return {
          expressions: [...result.expressions, compiled.value],
          scope: compiled.scope
        };
      };

      const {
        expressions
      } = expr.expressions.reduce(generator, {
        expressions: [],
        scope
      });
      const imports = expr.module.imports ? expr.module.imports.map(next) : [];
      return [...imports, ...expressions, M.exporter(expr.module.exports)];

    default:
      throw new Error(`Unrecognized type: ${expr.type}\n, in expr: ${JSON.stringify(expr)}`);
  }
};

exports.compile = compile;