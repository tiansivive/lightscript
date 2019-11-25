// Generated automatically by nearley, version 2.19.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }


	const moo = require('moo')
	const lexer = moo.compile({
		true:   ["true", "on", "active", "yes", "enabled"],
		false:  ["false", "off", "inactive", "no", "disabled"],
		keywords: ["if", "then", "else", "do", "unless", "where", "match", "when", "case", "of", "otherwise", "let", "in", "not", "and", "or", "import", "export", "from", "to", "module", "as", "type", "instance"],
		rarrow: "->",
		larror: "<-",
		assignment: "=",
		operator: ["+", "-", "*", "/", "<", ">", "<=", ">=", "==", "&&", "||", "!", "|>", "<|", ">>", "<<", "<>", "++", "--", "?"],
		delimiter: ["{", "}", "[", "]", "(", ")"],				
		comma: ",",
		colon: ":",
		union: "|",	
		ws: /[ \t]+/,
		nl:  {match: /\n+/, lineBreaks: true},
		dot: /\./,
		identifier: /[a-zA-Z_]\w*/,
		digits:  /[0-9]+/,
		string:  /'(?:\\["\\]|[^\n"\\])*'|"(?:\\["\\]|[^\n"\\])*"/

	});
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "script$ebnf$1", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl)], "postprocess": id},
    {"name": "script$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "script$ebnf$2", "symbols": []},
    {"name": "script$ebnf$2$subexpression$1", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl), "wrapped"]},
    {"name": "script$ebnf$2", "symbols": ["script$ebnf$2", "script$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "script$ebnf$3", "symbols": ["_"], "postprocess": id},
    {"name": "script$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "script", "symbols": ["script$ebnf$1", "wrapped", "script$ebnf$2", "script$ebnf$3"], "postprocess":  ([nl, head, tail]) => {
        	const arr = tail ? tail.map(([, expr]) => expr) : []
        	return { type: "script", val: [ head, ...arr] }
        } },
    {"name": "wrapped", "symbols": ["_", "expression"], "postprocess": ([, e]) => ({type: 'expression', value: e })},
    {"name": "expression", "symbols": ["identifier"], "postprocess": id},
    {"name": "expression", "symbols": ["literal"], "postprocess": ([literal]) => ({type: "literal", value: literal })},
    {"name": "expression", "symbols": ["assignment"], "postprocess": id},
    {"name": "expression", "symbols": ["parenthesis"], "postprocess": id},
    {"name": "expression", "symbols": ["property"], "postprocess": id},
    {"name": "expression", "symbols": ["operation"], "postprocess": id},
    {"name": "expression", "symbols": ["ifThenElse"], "postprocess": ([expr]) => ({type: "control-flow", value: expr })},
    {"name": "expression", "symbols": ["match"], "postprocess": ([expr]) => ({type: "control-flow", value: expr })},
    {"name": "expression", "symbols": ["function"], "postprocess": id},
    {"name": "expression", "symbols": ["functionApplication"], "postprocess": id},
    {"name": "parenthesis", "symbols": [{"literal":"("}, "_", "expression", "_", {"literal":")"}], "postprocess": ([,, expr,,]) => ({type: "parenthesis", value: expr })},
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": ([{ type, value }]) => ({type, value})},
    {"name": "literal", "symbols": ["number"], "postprocess": ([num]) => ({type: 'number', value: num})},
    {"name": "literal", "symbols": ["string"], "postprocess": ([str]) => ({type: 'string', value: str})},
    {"name": "literal", "symbols": ["boolean"], "postprocess": ([boolean]) => ({type: "boolean", value: boolean})},
    {"name": "literal", "symbols": ["tuple"], "postprocess": ([tuple]) => ({type: 'tuple', value: tuple})},
    {"name": "literal", "symbols": ["list"], "postprocess": ([list]) => ({type: 'list', value: list})},
    {"name": "literal", "symbols": ["record"], "postprocess": ([record]) => ({type: 'record', value: record})},
    {"name": "assignment", "symbols": ["identifier", "_", {"literal":"="}, "_", "expression"], "postprocess": ([id,, equals,, expression]) => ({ type: "assignment", id, value: expression })},
    {"name": "property$subexpression$1", "symbols": ["record"]},
    {"name": "property$subexpression$1", "symbols": ["identifier"]},
    {"name": "property$subexpression$1", "symbols": ["parenthesis"]},
    {"name": "property$subexpression$1", "symbols": ["property"]},
    {"name": "property", "symbols": ["property$subexpression$1", (lexer.has("dot") ? {type: "dot"} : dot), "identifier"], "postprocess": ([[context],, value]) => ({type: "property", context, value })},
    {"name": "operation", "symbols": ["algebraic"], "postprocess": ([math]) => ({type: 'math', ...math})},
    {"name": "operation", "symbols": ["logic"], "postprocess": ([logic]) => ({type: 'logical', value: logic})},
    {"name": "operation", "symbols": ["condition"], "postprocess": ([condition]) => ({type: 'conditional', value: condition})},
    {"name": "operation", "symbols": ["composition"], "postprocess": ([composition]) => ({type: 'composition', value: composition})},
    {"name": "operation", "symbols": ["concatenation"], "postprocess": ([concatenation]) => ({type: 'concatenation', value: concatenation})},
    {"name": "ifThenElse$ebnf$1", "symbols": ["__"]},
    {"name": "ifThenElse$ebnf$1", "symbols": ["ifThenElse$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ifThenElse$ebnf$2", "symbols": ["__"]},
    {"name": "ifThenElse$ebnf$2", "symbols": ["ifThenElse$ebnf$2", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ifThenElse", "symbols": [{"literal":"if"}, "__", "expression", "ifThenElse$ebnf$1", {"literal":"then"}, "__", "expression", "ifThenElse$ebnf$2", {"literal":"else"}, "__", "expression"], "postprocess": ([ ,,condition,, ,,truthy,, ,,falsy]) => ({ type: "if-then-else", condition, truthy, falsy })},
    {"name": "match$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("union") ? {type: "union"} : union), "_", "expression", "_", {"literal":"->"}, "_", "expression"]},
    {"name": "match$ebnf$1", "symbols": ["match$ebnf$1$subexpression$1"]},
    {"name": "match$ebnf$1$subexpression$2", "symbols": ["_", (lexer.has("union") ? {type: "union"} : union), "_", "expression", "_", {"literal":"->"}, "_", "expression"]},
    {"name": "match$ebnf$1", "symbols": ["match$ebnf$1", "match$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "match$ebnf$2$subexpression$1", "symbols": ["_", (lexer.has("union") ? {type: "union"} : union), "_", {"literal":"otherwise"}, "_", {"literal":"->"}, "_", "expression"]},
    {"name": "match$ebnf$2", "symbols": ["match$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "match$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "match", "symbols": [{"literal":"match"}, "__", "expression", "match$ebnf$1", "match$ebnf$2"], "postprocess":  ([,, expression, patterns, otherwise]) => ({ 
        	type: "match", 
        	expression,
        	patterns: patterns.map(([,,, evaluation,,,, value]) => ({ evaluation, value })), 
        	otherwise: otherwise ? otherwise[otherwise.length -1] : null 
        }) },
    {"name": "logic$subexpression$1", "symbols": ["identifier"]},
    {"name": "logic$subexpression$1", "symbols": ["boolean"]},
    {"name": "logic$subexpression$1", "symbols": ["property"]},
    {"name": "logic$subexpression$1", "symbols": ["parenthesis"]},
    {"name": "logic$subexpression$2", "symbols": [{"literal":"||"}]},
    {"name": "logic$subexpression$2", "symbols": [{"literal":"&&"}]},
    {"name": "logic", "symbols": ["logic$subexpression$1", "_", "logic$subexpression$2", "_", "expression"], "postprocess": ([[left],, [op],, right]) => ({operator: op.value, left, right})},
    {"name": "logic", "symbols": [{"literal":"!"}, "expression"]},
    {"name": "algebraic$subexpression$1", "symbols": ["identifier"]},
    {"name": "algebraic$subexpression$1", "symbols": ["literal"]},
    {"name": "algebraic$subexpression$1", "symbols": ["property"]},
    {"name": "algebraic$subexpression$1", "symbols": ["functionApplication"]},
    {"name": "algebraic$subexpression$1", "symbols": ["parenthesis"]},
    {"name": "algebraic$subexpression$2", "symbols": [{"literal":"+"}]},
    {"name": "algebraic$subexpression$2", "symbols": [{"literal":"-"}]},
    {"name": "algebraic$subexpression$2", "symbols": [{"literal":"*"}]},
    {"name": "algebraic$subexpression$2", "symbols": [{"literal":"/"}]},
    {"name": "algebraic", "symbols": ["algebraic$subexpression$1", "_", "algebraic$subexpression$2", "_", "expression"], "postprocess": ([[left],, [op],, right]) => ({operator: op.value, left, right})},
    {"name": "condition$subexpression$1", "symbols": ["identifier"]},
    {"name": "condition$subexpression$1", "symbols": ["literal"]},
    {"name": "condition$subexpression$1", "symbols": ["property"]},
    {"name": "condition$subexpression$1", "symbols": ["functionApplication"]},
    {"name": "condition$subexpression$1", "symbols": ["parenthesis"]},
    {"name": "condition$subexpression$2", "symbols": [{"literal":"<"}]},
    {"name": "condition$subexpression$2", "symbols": [{"literal":">"}]},
    {"name": "condition$subexpression$2", "symbols": [{"literal":"<="}]},
    {"name": "condition$subexpression$2", "symbols": [{"literal":">="}]},
    {"name": "condition$subexpression$2", "symbols": [{"literal":"=="}]},
    {"name": "condition", "symbols": ["condition$subexpression$1", "_", "condition$subexpression$2", "_", "expression"], "postprocess": ([[left],, [op],, right]) => ({operator: op.value, left, right})},
    {"name": "composition$subexpression$1", "symbols": ["identifier"]},
    {"name": "composition$subexpression$1", "symbols": ["function"]},
    {"name": "composition$subexpression$1", "symbols": ["property"]},
    {"name": "composition$subexpression$1", "symbols": ["functionApplication"]},
    {"name": "composition$subexpression$1", "symbols": ["parenthesis"]},
    {"name": "composition$subexpression$2", "symbols": [{"literal":"<<"}]},
    {"name": "composition$subexpression$2", "symbols": [{"literal":">>"}]},
    {"name": "composition", "symbols": ["composition$subexpression$1", "_", "composition$subexpression$2", "_", "expression"], "postprocess": ([[left],, [op],, right]) => ({operator: op.value, left, right})},
    {"name": "concatenation$subexpression$1", "symbols": ["identifier"]},
    {"name": "concatenation$subexpression$1", "symbols": ["string"]},
    {"name": "concatenation$subexpression$1", "symbols": ["list"]},
    {"name": "concatenation$subexpression$1", "symbols": ["tuple"]},
    {"name": "concatenation$subexpression$1", "symbols": ["record"]},
    {"name": "concatenation$subexpression$1", "symbols": ["property"]},
    {"name": "concatenation$subexpression$1", "symbols": ["functionApplication"]},
    {"name": "concatenation$subexpression$1", "symbols": ["parenthesis"]},
    {"name": "concatenation", "symbols": ["concatenation$subexpression$1", "_", {"literal":"<>"}, "_", "expression"], "postprocess": ([[left],, [op],, right]) => ({operator: op.value, left, right})},
    {"name": "arguments$ebnf$1", "symbols": []},
    {"name": "arguments$ebnf$1$subexpression$1", "symbols": ["__", "identifier"]},
    {"name": "arguments$ebnf$1", "symbols": ["arguments$ebnf$1", "arguments$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "arguments", "symbols": ["identifier", "arguments$ebnf$1"], "postprocess": ([arg, args]) => [arg.value, ...args.map(([, a]) => a.value)]},
    {"name": "parameters$ebnf$1$subexpression$1", "symbols": ["__", "parameter"]},
    {"name": "parameters$ebnf$1", "symbols": ["parameters$ebnf$1$subexpression$1"]},
    {"name": "parameters$ebnf$1$subexpression$2", "symbols": ["__", "parameter"]},
    {"name": "parameters$ebnf$1", "symbols": ["parameters$ebnf$1", "parameters$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "parameters", "symbols": ["parameters$ebnf$1"], "postprocess": ([params]) => params.map(([, p]) => p)},
    {"name": "parameter", "symbols": ["literal"], "postprocess": id},
    {"name": "parameter", "symbols": ["identifier"], "postprocess": id},
    {"name": "parameter", "symbols": ["parenthesis"], "postprocess": id},
    {"name": "function", "symbols": ["arguments", "_", {"literal":"->"}, "_", "expression"], "postprocess": ([args,, arrow,, expression]) => ({ type: "function", args, value: expression })},
    {"name": "functionApplication$subexpression$1", "symbols": ["identifier"]},
    {"name": "functionApplication$subexpression$1", "symbols": [(lexer.has("operator") ? {type: "operator"} : operator)]},
    {"name": "functionApplication$ebnf$1", "symbols": [{"literal":"<|"}], "postprocess": id},
    {"name": "functionApplication$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "functionApplication", "symbols": ["functionApplication$subexpression$1", "_", "functionApplication$ebnf$1", "parameters"], "postprocess": ([[id],, pipeline, params]) => ({ type: "function-application", id, params })},
    {"name": "functionApplication$subexpression$2", "symbols": ["identifier"]},
    {"name": "functionApplication$subexpression$2", "symbols": [(lexer.has("operator") ? {type: "operator"} : operator)]},
    {"name": "functionApplication", "symbols": ["parameters", {"literal":"|>"}, "functionApplication$subexpression$2"], "postprocess": ([params, pipeline, [id]]) => ({ type: "function-application", id, params })},
    {"name": "tuple$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "_", "expression", "_"]},
    {"name": "tuple$ebnf$1", "symbols": ["tuple$ebnf$1$subexpression$1"]},
    {"name": "tuple$ebnf$1$subexpression$2", "symbols": [{"literal":","}, "_", "expression", "_"]},
    {"name": "tuple$ebnf$1", "symbols": ["tuple$ebnf$1", "tuple$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "tuple", "symbols": [{"literal":"("}, "_", "expression", "_", "tuple$ebnf$1", {"literal":")"}], "postprocess": ([,, expr,, rest,]) => [expr, ...rest.map(([,, xpr,]) => xpr)]},
    {"name": "list", "symbols": [{"literal":"["}, "_", {"literal":"]"}], "postprocess": () => []},
    {"name": "list$ebnf$1", "symbols": []},
    {"name": "list$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "_", "expression", "_"]},
    {"name": "list$ebnf$1", "symbols": ["list$ebnf$1", "list$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "list", "symbols": [{"literal":"["}, "_", "expression", "_", "list$ebnf$1", {"literal":"]"}], "postprocess": ([,, expr,, rest,]) => [expr, ...rest.map(([,, xpr,]) => xpr)]},
    {"name": "record", "symbols": [{"literal":"{"}, "_", {"literal":"}"}], "postprocess": () => ({ })},
    {"name": "record$ebnf$1", "symbols": []},
    {"name": "record$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "_", "key", "_", {"literal":":"}, "_", "expression", "_"]},
    {"name": "record$ebnf$1", "symbols": ["record$ebnf$1", "record$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "record", "symbols": [{"literal":"{"}, "_", "key", "_", {"literal":":"}, "_", "expression", "_", "record$ebnf$1", {"literal":"}"}], "postprocess": ([,, key,, colon,, value,, rest,]) => [{ key, value }, ...rest.map(([,,k,,,,v,]) => ({ key: k, value: v })) ]},
    {"name": "key", "symbols": ["identifier"], "postprocess": ([id]) => id.value},
    {"name": "string", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": ([{ value }]) => value.slice(1, value.length -1)},
    {"name": "number", "symbols": [(lexer.has("digits") ? {type: "digits"} : digits)], "postprocess": ([{ value }]) => +value},
    {"name": "number", "symbols": [(lexer.has("digits") ? {type: "digits"} : digits), (lexer.has("dot") ? {type: "dot"} : dot), (lexer.has("digits") ? {type: "digits"} : digits)], "postprocess": ([whole,, fraction]) => +(whole.value + "." + fraction.value)},
    {"name": "boolean", "symbols": [(lexer.has("true") ? {type: "true"} : true)], "postprocess": _ => true},
    {"name": "boolean", "symbols": [(lexer.has("false") ? {type: "false"} : false)], "postprocess": _ => false},
    {"name": "_$subexpression$1", "symbols": []},
    {"name": "_$subexpression$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "_$subexpression$1", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "_", "symbols": ["_$subexpression$1"], "postprocess": _ => null},
    {"name": "__$subexpression$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "__$subexpression$1", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "__", "symbols": ["__$subexpression$1"], "postprocess": _ => null}
]
  , ParserStart: "script"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
