// Generated automatically by nearley, version 2.19.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

	const moo = require('moo')
	const lexer = moo.compile({
		true:   ["true", "on", "active", "yes", "enabled"],
		false:  ["false", "off", "inactive", "no", "disabled"],
		ws: /[ \t]+/,
		nl:  {match: /\n+/, lineBreaks: true},
		dot: /\./,
		identifier: /[a-zA-Z_]\w*/,
		digits:  /[0-9]+/,
		string:  /"(?:\\["\\]|[^\n"\\])*"/,
		quote: ["'", '"'],
		assignment: "=",
		delimiter: ["{", "}", "[", "]", "(", ")"],
		comma: ",",
		colon: ":",
		rarrow: "->"
	});
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "program", "symbols": ["expression", "_"], "postprocess": ([expression]) => ({ type: "expression", value: expression })},
    {"name": "program", "symbols": ["expression", "_", (lexer.has("nl") ? {type: "nl"} : nl)], "postprocess": ([expression]) => ({ type: "expression", value: expression })},
    {"name": "program", "symbols": ["expression", "_", (lexer.has("nl") ? {type: "nl"} : nl), "program"], "postprocess": ([expression,, nl, prog]) => [{ type: "expression", value: expression }, ...prog]},
    {"name": "expression", "symbols": ["identifier"], "postprocess": id},
    {"name": "expression", "symbols": ["literal"], "postprocess": ([literal]) => ({type: "literal", value: literal })},
    {"name": "expression", "symbols": ["assignment"], "postprocess": id},
    {"name": "expression", "symbols": ["function"], "postprocess": id},
    {"name": "expression", "symbols": ["functionApplication"], "postprocess": id},
    {"name": "expression", "symbols": ["parenthesisExpression"], "postprocess": id},
    {"name": "parenthesisExpression", "symbols": [{"literal":"("}, "_", "expression", "_", {"literal":")"}], "postprocess": ([,, expr,,]) => ({type: "parenthesis-expression", value: expr })},
    {"name": "assignment", "symbols": ["identifier", "_", (lexer.has("assignment") ? {type: "assignment"} : assignment), "_", "expression"], "postprocess": ([id,, equals,, expression]) => ({ type: "assignment", id, value: expression })},
    {"name": "literal", "symbols": ["number"], "postprocess": ([num]) => ({type: 'number', value: num})},
    {"name": "literal", "symbols": ["string"], "postprocess": ([str]) => ({type: 'string', value: str})},
    {"name": "literal", "symbols": ["boolean"], "postprocess": ([boolean]) => ({type: "boolean", value: boolean})},
    {"name": "literal", "symbols": ["tuple"], "postprocess": ([tuple]) => ({type: 'tuple', value: tuple})},
    {"name": "literal", "symbols": ["array"], "postprocess": ([array]) => ({type: 'array', value: array})},
    {"name": "literal", "symbols": ["record"], "postprocess": ([record]) => ({type: 'record', value: record})},
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": ([{ type, value }]) => ({type, value})},
    {"name": "tuple$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "_", "expression", "_"]},
    {"name": "tuple$ebnf$1", "symbols": ["tuple$ebnf$1$subexpression$1"]},
    {"name": "tuple$ebnf$1$subexpression$2", "symbols": [{"literal":","}, "_", "expression", "_"]},
    {"name": "tuple$ebnf$1", "symbols": ["tuple$ebnf$1", "tuple$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "tuple", "symbols": [{"literal":"("}, "_", "expression", "_", "tuple$ebnf$1", {"literal":")"}], "postprocess": ([,, expr,, rest,]) => [expr, ...rest.map(([,, xpr,]) => xpr)]},
    {"name": "array", "symbols": [{"literal":"["}, "_", {"literal":"]"}], "postprocess": () => []},
    {"name": "array$ebnf$1", "symbols": []},
    {"name": "array$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "_", "expression", "_"]},
    {"name": "array$ebnf$1", "symbols": ["array$ebnf$1", "array$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "array", "symbols": [{"literal":"["}, "_", "expression", "_", "array$ebnf$1", {"literal":"]"}], "postprocess": ([,, expr,, rest,]) => [expr, ...rest.map(([,, xpr,]) => xpr)]},
    {"name": "record", "symbols": [{"literal":"{"}, "_", {"literal":"}"}], "postprocess": () => ({ })},
    {"name": "record$ebnf$1", "symbols": []},
    {"name": "record$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "_", "key", "_", {"literal":":"}, "_", "expression", "_"]},
    {"name": "record$ebnf$1", "symbols": ["record$ebnf$1", "record$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "record", "symbols": [{"literal":"{"}, "_", "key", "_", {"literal":":"}, "_", "expression", "_", "record$ebnf$1", {"literal":"}"}], "postprocess": ([,, key,, colon,, value,, rest,]) => [{ key, value }, ...rest.map(([,,k,,,,v,]) => ({ key: k, value: v })) ]},
    {"name": "key", "symbols": ["identifier"], "postprocess": ([id]) => id.value},
    {"name": "arguments$ebnf$1", "symbols": []},
    {"name": "arguments$ebnf$1$subexpression$1", "symbols": ["__", "identifier"]},
    {"name": "arguments$ebnf$1", "symbols": ["arguments$ebnf$1", "arguments$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "arguments", "symbols": ["identifier", "arguments$ebnf$1"], "postprocess": ([arg, args]) => [arg, ...args.map(([, a]) => a)]},
    {"name": "parameters$ebnf$1$subexpression$1", "symbols": ["__", "parameter"]},
    {"name": "parameters$ebnf$1", "symbols": ["parameters$ebnf$1$subexpression$1"]},
    {"name": "parameters$ebnf$1$subexpression$2", "symbols": ["__", "parameter"]},
    {"name": "parameters$ebnf$1", "symbols": ["parameters$ebnf$1", "parameters$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "parameters", "symbols": ["parameters$ebnf$1"], "postprocess": ([params]) => params.map(([, p]) => p)},
    {"name": "parameter", "symbols": ["literal"], "postprocess": id},
    {"name": "parameter", "symbols": ["identifier"], "postprocess": id},
    {"name": "parameter", "symbols": ["parenthesisExpression"], "postprocess": id},
    {"name": "function", "symbols": ["arguments", "_", {"literal":"->"}, "_", "expression"], "postprocess": ([args,, arrow,, expression]) => ({ type: "function", args, value: expression })},
    {"name": "functionApplication", "symbols": ["identifier", "parameters"], "postprocess": ([id, params]) => ({ type: "function-application", id, params })},
    {"name": "string", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": ([{ value }]) => value.slice(1, value.length -1)},
    {"name": "number", "symbols": [(lexer.has("digits") ? {type: "digits"} : digits)], "postprocess": ([{value}]) => +value},
    {"name": "number", "symbols": [(lexer.has("digits") ? {type: "digits"} : digits), (lexer.has("dot") ? {type: "dot"} : dot), (lexer.has("digits") ? {type: "digits"} : digits)], "postprocess": ([whole,,fraction]) => +(whole.value + "." + fraction.value)},
    {"name": "boolean", "symbols": [(lexer.has("true") ? {type: "true"} : true)], "postprocess": _ => true},
    {"name": "boolean", "symbols": [(lexer.has("false") ? {type: "false"} : false)], "postprocess": _ => false},
    {"name": "_$subexpression$1", "symbols": []},
    {"name": "_$subexpression$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "_", "symbols": ["_$subexpression$1"], "postprocess": _ => null},
    {"name": "__", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": _ => null}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
