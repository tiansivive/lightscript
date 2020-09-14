"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fraction = exports.number = exports.string = exports.key = exports.record = exports.list = exports.tuple = exports.opFunction = exports.forwardApply = exports.backApply = exports.func = exports.decorator = exports.params = exports.fnArguments = exports.concatenation = exports.composition = exports.condition = exports.algebraic = exports.not = exports.andOr = exports.match = exports.ifThenElse = exports.operations = exports.property = exports.assignment = exports.literals = exports.binding = exports.identifier = exports.parenthesis = exports.expressions = exports.modules = exports.exportModule = exports.importModule = exports.wrap = exports.script = void 0;

// SCRIPT
const script = ([, module, head, tail]) => {
  const arr = tail ? tail.map(([expr]) => expr) : [];
  const expressions = !head ? arr : [{
    type: 'expression',
    value: head
  }, ...arr];
  return {
    type: "script",
    module,
    expressions
  };
};

exports.script = script;

const wrap = ([,, e]) => ({
  type: 'expression',
  value: e
});

exports.wrap = wrap;

const importModule = ([,, path,,,, id]) => ({
  type: "import",
  id,
  path
});

exports.importModule = importModule;

const exportModule = ([,, ids = []]) => ids.map(({
  value
}) => ({
  type: 'export',
  value
}));

exports.exportModule = exportModule;

const modules = ([imports, exports]) => ({
  imports: imports.map(([imp]) => imp),
  exports
});

exports.modules = modules;
const expressions = {
  literal: ([literal]) => ({
    type: "literal",
    value: literal
  }),
  ifThenElse: ([expr]) => ({
    type: "control-flow",
    value: expr
  }),
  match: ([expr]) => ({
    type: "control-flow",
    value: expr
  }),
  ops: ([[op]]) => ({
    type: "operator-function",
    operator: {
      type: op.type,
      value: op.value
    }
  }),
  decorate: ([decorator,, expr]) => ({ ...expr,
    decorator
  })
};
exports.expressions = expressions;

const parenthesis = ([,, expr,,]) => ({
  type: "parenthesis",
  value: expr
});

exports.parenthesis = parenthesis;

const identifier = ([{
  type,
  value
}]) => ({
  type,
  value
});

exports.identifier = identifier;

const binding = ([id,,,, expr]) => ({
  type: 'binding',
  id,
  value: expr
});

exports.binding = binding;
const literals = {
  number: ([num]) => ({
    type: 'number',
    value: num
  }),
  string: ([str]) => ({
    type: 'string',
    value: str
  }),
  boolean: ([boolean]) => ({
    type: "boolean",
    value: boolean
  }),
  tuple: ([tuple]) => ({
    type: 'tuple',
    value: tuple
  }),
  list: ([list]) => ({
    type: 'list',
    value: list
  }),
  record: ([record]) => ({
    type: 'record',
    value: record
  })
};
exports.literals = literals;

const assignment = ([id,, equals,, expression]) => ({
  type: "assignment",
  id,
  value: expression
});

exports.assignment = assignment;

const property = ([[context],, value]) => ({
  type: "property",
  context,
  value
});

exports.property = property;
const operations = {
  algebraic: ([math]) => ({
    type: 'math',
    ...math
  }),
  logic: ([logic]) => ({
    type: 'logical',
    ...logic
  }),
  condition: ([condition]) => ({
    type: 'conditional',
    ...condition
  }),
  composition: ([composition]) => ({
    type: 'composition',
    ...composition
  }),
  concatenation: ([concatenation]) => ({
    type: 'concatenation',
    ...concatenation
  })
};
exports.operations = operations;

const ifThenElse = ([,, condition,,,, truthy,,,, falsy]) => ({
  type: "if-then-else",
  condition,
  truthy,
  falsy
});

exports.ifThenElse = ifThenElse;

const match = ([,, expression, patterns, otherwise]) => ({
  type: "match",
  expression,
  patterns: patterns.map(([,,, evaluation,,,, value]) => ({
    evaluation,
    value
  })),
  otherwise: otherwise ? otherwise[otherwise.length - 1] : null
});

exports.match = match;

const andOr = ([[left],, [op],, right]) => ({
  operator: op.value,
  left,
  right
});

exports.andOr = andOr;

const not = ([op, expression]) => ({
  operator: op.value,
  expression
});

exports.not = not;

const algebraic = ([[left],, [op],, right]) => ({
  operator: op.value,
  left,
  right
});

exports.algebraic = algebraic;

const condition = ([[left],, [op],, right]) => ({
  operator: op.value,
  left,
  right
});

exports.condition = condition;

const composition = ([[left],, [op],, right]) => ({
  operator: op.value,
  left,
  right
});

exports.composition = composition;

const concatenation = ([[left],, op,, right]) => ({
  operator: op.value,
  left,
  right
});

exports.concatenation = concatenation;

const fnArguments = ([arg, args]) => [arg.value, ...args.map(([,, a]) => a.value)];

exports.fnArguments = fnArguments;

const params = ([params]) => params.map(([,, p]) => p);

exports.params = params;

const decorator = ([, id,, expr, rest = []]) => ({
  type: 'decorator',
  id,
  value: [expr, ...rest.map(([,,, expr]) => expr)]
});

exports.decorator = decorator;

const func = ([args,, arrow,, expression]) => ({
  type: "function",
  args,
  value: expression
});

exports.func = func;

const backApply = ([[id],, pipeline, params]) => ({
  type: "function-application",
  id,
  params
});

exports.backApply = backApply;

const forwardApply = ([params, pipeline, id]) => ({
  type: "function-application",
  id,
  params
});

exports.forwardApply = forwardApply;

const opFunction = ([[op],, expr]) => {
  const type = operator => {
    switch (operator) {
      case '+':
      case '-':
      case '*':
      case '/':
        return 'math';

      case '<':
      case '<=':
      case '>':
      case '>=':
      case '==':
        return 'conditional';

      case '<<':
      case '>>':
        return 'composition';

      case '&&':
      case '||':
        return 'logical';

      case '<>':
        return 'concatenation';
    }
  };

  const args = ['x'];
  if (!expr) args.push('y');
  const body = {
    type: type(op.value),
    operator: op.value,
    left: {
      type: 'identifier',
      value: 'x'
    },
    right: expr ? expr : {
      type: 'identifier',
      value: 'y'
    }
  };
  return func([args,,,, body]);
};

exports.opFunction = opFunction;

const tuple = ([,, expr,, rest]) => [expr, ...rest.map(([,, xpr]) => xpr)];

exports.tuple = tuple;

const list = ([,, expr,, rest]) => [expr, ...rest.map(([,, xpr]) => xpr)];

exports.list = list;

const record = ([,, key,, colon,, value, rest]) => [{
  key,
  value
}, ...rest.map(([,,, k,,,, v]) => ({
  key: k,
  value: v
}))];

exports.record = record;

const key = ([id]) => id.value;

exports.key = key;

const string = ([{
  value
}]) => value.slice(1, value.length - 1);

exports.string = string;

const number = ([{
  value
}]) => +value;

exports.number = number;

const fraction = ([whole,, fraction]) => +(whole.value + "." + fraction.value);

exports.fraction = fraction;