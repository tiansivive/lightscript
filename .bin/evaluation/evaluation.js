"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.evaluate = void 0;

var I = _interopRequireWildcard(require("./identifiers"));

var R = _interopRequireWildcard(require("./literals/record"));

var L = _interopRequireWildcard(require("./literals/list"));

var T = _interopRequireWildcard(require("./literals/tuple"));

var FN = _interopRequireWildcard(require("./functions/definition"));

var CF = _interopRequireWildcard(require("./control-flow/cf"));

var OP = _interopRequireWildcard(require("./operations/operations"));

var GO = _interopRequireWildcard(require("./operations/graph"));

var M = _interopRequireWildcard(require("./modules"));

var S = _interopRequireWildcard(require("./scripts"));

var _ffi = require("./ffi");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * 
 * @param { Expression } expr 
 * @param { Scope } scope 
 * 
 * @return {{ value: *, scope: Scope }}
 */
const assignment = ({
  id,
  value,
  decorator
}, scope) => {
  const result = evaluate(value, scope);
  const identifiers = decorator && result.value.type === 'function' ? [{
    id: id.value,
    value: { ...result.value,
      decorator: {
        id: decorator.id,
        value: decorator.value
      }
    }
  }, ...scope.identifiers] : [{
    id: id.value,
    value: result.value,
    foreign: result.foreign
  }, ...scope.identifiers];
  return {
    value: result.value,
    scope: {
      identifiers
    }
  };
};

const property = ({
  id,
  value,
  context,
  foreign
}, scope) => {
  const evaluatedContext = evaluate(context, scope).value;
  const val = evaluatedContext.value[value.value];

  if (evaluatedContext.foreign && !val.type) {
    // TODO:
    return {
      value: _ffi.transforms.fromJS(val, scope, evaluatedContext.value),
      scope
    };
  }

  return {
    value: val,
    scope
  };
};
/**
 * 
 * @param { Expression } expr 
 * @param { Scope } scope 
 * 
 * @return {{ value: *, scope: Scope }}
 */


const evaluate = (expr, scope) => {
  if (process.env.DEBUG) console.log('evaluating:', expr.type);

  switch (expr.type) {
    case 'literal':
    case 'control-flow':
    case 'parenthesis':
    case 'expression':
      return evaluate(expr.value, scope);

    case 'boolean':
    case 'number':
    case 'string':
      return {
        value: expr.value,
        scope
      };

    case 'tuple':
      return {
        value: T.create(expr.value, scope),
        scope
      };

    case 'list':
      return {
        value: L.create(expr.value, scope),
        scope
      };

    case 'record':
      return {
        value: R.create(expr.value, scope),
        scope
      };

    case 'property':
      return property(expr, scope);

    case 'identifier':
      return {
        value: I.find(expr.value, scope),
        scope
      };

    case 'assignment':
      return assignment(expr, scope);

    case 'math':
      return {
        value: OP.math(expr, scope),
        scope
      };

    case 'logical':
      return {
        value: OP.logical(expr, scope),
        scope
      };

    case 'conditional':
      return {
        value: OP.conditional(expr, scope),
        scope
      };

    case 'concatenation':
      return {
        value: OP.concatenation(expr, scope),
        scope
      };

    case 'composition':
      return {
        value: OP.composition(expr, scope),
        scope
      };

    case 'graph-query':
      return {
        value: GO.query(expr, scope),
        scope
      };

    case 'graph-mutation':
      return {
        value: GO.mutation(expr, scope),
        scope
      };

    case 'function':
      return FN.create(expr, scope);

    case 'function-application':
      return FN.apply(expr.id, expr.params, scope);

    case 'if-then-else':
      return CF.ifThenElse(expr, scope);

    case 'match':
      return CF.patternMatching(expr, scope);

    case 'import':
      return M.importer(expr, scope);

    case 'script':
      return S.script(expr, scope);

    default:
      throw new Error(`Unrecognized type: ${expr.type}\n, in expr: ${JSON.stringify(expr)}`);
  }
};

exports.evaluate = evaluate;