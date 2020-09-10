

// SCRIPT
export const script = ([, module, head, tail]) => {
  const arr = tail ? tail.map(([ expr]) => expr) : []
  const expressions = !head 
    ? arr
    :  [ 
      { type: 'expression', value: head }, 
      ...arr
    ]

	return { 
    type: "script", 
    module,
    expressions
  }
} 

export const wrap = ([,,e]) => ({ type: 'expression', value: e })

export const importModule = ([, ffi,, path,,,, id]) => ({ type: "import", id, path, foreign: !!(ffi && ffi[1]) })
export const exportModule = ([ ,, ids = [] ]) => ids.map(({ value }) => value)


export const modules = ([ imports, exports ]) => ({ imports: imports.map(([imp]) => imp), exports })

export const expressions = {
  literal: ([literal]) => ({ type: "literal", value: literal }),
  ifThenElse: ([expr]) => ({ type: "control-flow", value: expr }),
  match: ([expr]) => ({ type: "control-flow", value: expr }),
  ops: ([[op]]) => ({ type: "operator-function", operator: { type: op.type, value: op.value } }),
  decorate: ([decorator,, expr]) => ({ ...expr, decorator })
}

export const parenthesis = ([,, expr,,]) => ({type: "parenthesis", value: expr })

export const identifier = ([{ type, value }]) => ({type, value})
export const binding = ([id,,,, expr]) => ({ type: 'binding', id, value: expr })

export const literals = {
  number: ([num]) => ({type: 'number', value: num}),
  string: ([str]) => ({type: 'string', value: str}),
	boolean: ([boolean]) => ({type: "boolean", value: boolean}),
  tuple: ([tuple]) => ({type: 'tuple', value: tuple}), 
 	list: ([list]) => ({type: 'list', value: list}), 
 	record: ([record]) => ({type: 'record', value: record})
}

export const assignment = ([id,, equals,, expression]) => ({ type: "assignment", id, value: expression })
export const property = ([[context],, value]) => ({type: "property", context, value })

export const operations = {
  algebraic: ([math]) => ({ type: 'math', ...math }), 
	logic: ([logic]) => ({ type: 'logical', ...logic }), 
	condition: ([condition]) => ({ type: 'conditional', ...condition }), 
	composition: ([composition]) => ({ type: 'composition', ...composition }), 
  concatenation: ([concatenation]) => ({type: 'concatenation', ...concatenation }), 
	graphQuery: ([query]) => ({ type: 'graph-query', ...query }), 
	graphMutation: ([mutation]) => ({ type: 'graph-mutation', ...mutation })
}

export const ifThenElse = ([ ,,condition,, ,,truthy,, ,,falsy]) => ({ type: "if-then-else", condition, truthy, falsy })
export const match = ([,, expression, patterns, otherwise]) => ({ 
	type: "match", 
	expression,
	patterns: patterns.map(([,,, evaluation,,,, value]) => ({ evaluation, value })), 
	otherwise: otherwise ? otherwise[otherwise.length -1] : null 
})


export const andOr = ([[left],, [op],, right]) => ({operator: op.value, left, right})
export const not = ([op, expression]) => ({operator: op.value, expression}) 

export const algebraic = ([[left],, [op],, right]) => ({ operator: op.value, left, right })
export const condition = ([[left],, [op],, right]) => ({ operator: op.value, left, right })

export const composition =  ([[left],, [op],, right]) => ({ operator: op.value, left, right })
export const concatenation =  ([[left],, op,, right]) => ({ operator: op.value, left, right })

export const graphQuery = ([[left],, op,, [right]]) => ({ operator: op.value, left, right })
export const graphMutation = ([[left],, op,, [right]]) => ({ operator: op.value, left, right })


export const fnArguments = ([arg, args]) => [arg.value, ...args.map(([,, a]) => a.value)]
export const params = ([params]) => params.map(([,, p]) => p)

export const decorator = ([, id,, expr, rest = []]) => ({ type: 'decorator', id, value: [expr, ...rest.map(([,,, expr]) => expr)] })
export const func = ([args,, arrow,, expression]) => ({ type: "function", args, value: expression })
export const backApply = ([[id],, pipeline, params]) => ({ type: "function-application", id, params }) 
export const forwardApply = ([params, pipeline, id]) => ({ type: "function-application", id, params })

export const opFunction = ([[op],, expr]) => {
  const type = operator => {
    switch(operator){
    case '+':
    case '-':
    case '*':
    case '/':
      return 'math'
    case '<':
    case '<=':
    case '>':
    case '>=':
    case '==':
      return 'conditional'
    case '<<':
    case '>>':
      return 'composition'
    case '&&':
    case '||':
      return 'logical'
    case '<>':
      return 'concatenation'
  }
}

  const args = ['x']
  if(!expr) args.push('y')

  const body = {
    type: type(op.value),
    operator: op.value,
    left: { type: 'identifier', value: 'x' },
    right: expr ? expr : { type: 'identifier', value: 'y' },
  }

  return func([args,,,, body])
}

export const tuple = ([,, expr,, rest,]) => [expr, ...rest.map(([,, xpr,]) => xpr)]
export const list = ([,, expr,, rest,]) => [expr, ...rest.map(([,, xpr,]) => xpr)]
export const record = ([,, key,, colon,, value, rest]) => [{ key, value }, ...rest.map(([,,,k,,,,v]) => ({ key: k, value: v })) ] 
export const key = ([id]) => id.value

export const emptyGraph = _  => ({ type: 'graph', value: [] })
export const graph = ([,, [pat],, rest,]) => ({ type: 'graph', value: [pat, ...rest.map(([,, [p],]) => p)] })

// export const node
// export const relId
// export const rel
// export const pattern

export const string = ([{ value }]) => value.slice(1, value.length -1)
export const number = ([{ value }]) => +value
export const fraction = ([whole,, fraction]) => +(whole.value + "." + fraction.value)
