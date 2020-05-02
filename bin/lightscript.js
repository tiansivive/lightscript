// Generated automatically by nearley, version 2.19.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

	const moo = require('moo')
	const B = require('./processors/index.js')
	const lexer = moo.compile({
		
		keywords: /(?:if|then|else|do|unless|where|match|when|case|of|otherwise|in|not|and|or|import|export|from|to|module|as|type|instance|@)\b/,
		true:   /(?:true|on|active|yes|enabled)\b/,
		false:  /(?:false|off|inactive|no|disabled)\b/,
		rarrow: "->",
		larror: "<-",
		rchevron: ">-",
		lchevron: "-<",
		binaryOp: ["+", "-", "*", "/", "<", ">", "<=", ">=", "==", "&&", "||", "|>", "<|", ">>", "<<", "<>", "|-", "-|"],
		unaryOp: ["!", "++", "--", "?"],
		assignment: "=",
		delimiter: ["{", "}", "[", "]", "(", ")"],				
		comma: ",",
		colon: ":",
		union: "|",	
		ws: /[ \t]+/,
		nl:  { match: /\n+/, lineBreaks: true },
		dot: /\./,		
		identifier: /[a-zA-Z_$]\w*/,
		digits:  /[0-9]+/,
		string:  /'(?:\\["\\]|[^\n"\\])*'|"(?:\\["\\]|[^\n"\\])*"/

	});
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "_$subexpression$1", "symbols": []},
    {"name": "_$subexpression$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "_$subexpression$1", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "_", "symbols": ["_$subexpression$1"], "postprocess": _ => null},
    {"name": "__$subexpression$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "__$subexpression$1", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "__", "symbols": ["__$subexpression$1"], "postprocess": _ => null},
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": B.identifier},
    {"name": "string", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": B.string},
    {"name": "number", "symbols": [(lexer.has("digits") ? {type: "digits"} : digits)], "postprocess": B.number},
    {"name": "number", "symbols": [(lexer.has("digits") ? {type: "digits"} : digits), (lexer.has("dot") ? {type: "dot"} : dot), (lexer.has("digits") ? {type: "digits"} : digits)], "postprocess": B.fraction},
    {"name": "boolean", "symbols": [(lexer.has("true") ? {type: "true"} : true)], "postprocess": _ => true},
    {"name": "boolean", "symbols": [(lexer.has("false") ? {type: "false"} : false)], "postprocess": _ => false},
    {"name": "literal", "symbols": ["number"], "postprocess": B.literals.number},
    {"name": "literal", "symbols": ["string"], "postprocess": B.literals.string},
    {"name": "literal", "symbols": ["boolean"], "postprocess": B.literals.boolean},
    {"name": "literal", "symbols": ["tuple"], "postprocess": B.literals.tuple},
    {"name": "literal", "symbols": ["list"], "postprocess": B.literals.list},
    {"name": "literal", "symbols": ["record"], "postprocess": B.literals.record},
    {"name": "tuple$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "_", "expression", "_"]},
    {"name": "tuple$ebnf$1", "symbols": ["tuple$ebnf$1$subexpression$1"]},
    {"name": "tuple$ebnf$1$subexpression$2", "symbols": [{"literal":","}, "_", "expression", "_"]},
    {"name": "tuple$ebnf$1", "symbols": ["tuple$ebnf$1", "tuple$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "tuple", "symbols": [{"literal":"("}, "_", "expression", "_", "tuple$ebnf$1", {"literal":")"}], "postprocess": B.tuple},
    {"name": "list", "symbols": [{"literal":"["}, "_", {"literal":"]"}], "postprocess": () => []},
    {"name": "list$ebnf$1", "symbols": []},
    {"name": "list$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "_", "expression", "_"]},
    {"name": "list$ebnf$1", "symbols": ["list$ebnf$1", "list$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "list", "symbols": [{"literal":"["}, "_", "expression", "_", "list$ebnf$1", {"literal":"]"}], "postprocess": B.list},
    {"name": "record", "symbols": [{"literal":"{"}, "_", {"literal":"}"}], "postprocess": () => []},
    {"name": "record$ebnf$1", "symbols": []},
    {"name": "record$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "_", "key", "_", {"literal":":"}, "_", "expression", "_"]},
    {"name": "record$ebnf$1", "symbols": ["record$ebnf$1", "record$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "record", "symbols": [{"literal":"{"}, "_", "key", "_", {"literal":":"}, "_", "expression", "_", "record$ebnf$1", {"literal":"}"}], "postprocess": B.record},
    {"name": "key", "symbols": ["identifier"], "postprocess": B.key},
    {"name": "expression", "symbols": ["identifier"], "postprocess": id},
    {"name": "expression", "symbols": ["literal"], "postprocess": B.expressions.literal},
    {"name": "expression", "symbols": ["assignment"], "postprocess": id},
    {"name": "expression", "symbols": ["parenthesis"], "postprocess": id},
    {"name": "expression", "symbols": ["property"], "postprocess": id},
    {"name": "expression", "symbols": ["operation"], "postprocess": id},
    {"name": "expression", "symbols": ["ifThenElse"], "postprocess": B.expressions.ifThenElse},
    {"name": "expression", "symbols": ["match"], "postprocess": B.expressions.match},
    {"name": "expression", "symbols": ["function"], "postprocess": id},
    {"name": "expression", "symbols": ["functionApplication"], "postprocess": id},
    {"name": "expression", "symbols": ["opFunction"], "postprocess": id},
    {"name": "expression", "symbols": ["do"], "postprocess": id},
    {"name": "expression", "symbols": ["decorator", (lexer.has("nl") ? {type: "nl"} : nl), "expression"], "postprocess": B.expressions.decorate},
    {"name": "parenthesis", "symbols": [{"literal":"("}, "_", "expression", "_", {"literal":")"}], "postprocess": B.parenthesis},
    {"name": "assignment", "symbols": ["identifier", "_", {"literal":"="}, "_", "expression"], "postprocess": B.assignment},
    {"name": "property$subexpression$1", "symbols": ["record"]},
    {"name": "property$subexpression$1", "symbols": ["identifier"]},
    {"name": "property$subexpression$1", "symbols": ["parenthesis"]},
    {"name": "property$subexpression$1", "symbols": ["property"]},
    {"name": "property", "symbols": ["property$subexpression$1", (lexer.has("dot") ? {type: "dot"} : dot), "identifier"], "postprocess": B.property},
    {"name": "binding$ebnf$1", "symbols": []},
    {"name": "binding$ebnf$1", "symbols": ["binding$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "binding$ebnf$2", "symbols": []},
    {"name": "binding$ebnf$2", "symbols": ["binding$ebnf$2", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "binding", "symbols": ["identifier", "binding$ebnf$1", {"literal":"<-"}, "binding$ebnf$2", "expression"], "postprocess": B.binding},
    {"name": "do$ebnf$1", "symbols": []},
    {"name": "do$ebnf$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "do$ebnf$1$subexpression$1$ebnf$1", "symbols": ["do$ebnf$1$subexpression$1$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "do$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":","}]},
    {"name": "do$ebnf$1$subexpression$1$subexpression$1", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "do$ebnf$1$subexpression$1$ebnf$2", "symbols": []},
    {"name": "do$ebnf$1$subexpression$1$ebnf$2", "symbols": ["do$ebnf$1$subexpression$1$ebnf$2", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "do$ebnf$1$subexpression$1$subexpression$2", "symbols": ["expression"]},
    {"name": "do$ebnf$1$subexpression$1$subexpression$2", "symbols": ["binding"]},
    {"name": "do$ebnf$1$subexpression$1", "symbols": ["do$ebnf$1$subexpression$1$ebnf$1", "do$ebnf$1$subexpression$1$subexpression$1", "do$ebnf$1$subexpression$1$ebnf$2", "do$ebnf$1$subexpression$1$subexpression$2"]},
    {"name": "do$ebnf$1", "symbols": ["do$ebnf$1", "do$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "do", "symbols": [{"literal":"do"}, "__", "expression", "do$ebnf$1"], "postprocess": B.doExpressions},
    {"name": "ifThenElse$ebnf$1", "symbols": ["__"]},
    {"name": "ifThenElse$ebnf$1", "symbols": ["ifThenElse$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ifThenElse$ebnf$2", "symbols": ["__"]},
    {"name": "ifThenElse$ebnf$2", "symbols": ["ifThenElse$ebnf$2", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ifThenElse", "symbols": [{"literal":"if"}, "__", "expression", "ifThenElse$ebnf$1", {"literal":"then"}, "__", "expression", "ifThenElse$ebnf$2", {"literal":"else"}, "__", "expression"], "postprocess": B.ifThenElse},
    {"name": "match$ebnf$1$subexpression$1$ebnf$1", "symbols": ["__"]},
    {"name": "match$ebnf$1$subexpression$1$ebnf$1", "symbols": ["match$ebnf$1$subexpression$1$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "match$ebnf$1$subexpression$1$ebnf$2", "symbols": ["__"]},
    {"name": "match$ebnf$1$subexpression$1$ebnf$2", "symbols": ["match$ebnf$1$subexpression$1$ebnf$2", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "match$ebnf$1$subexpression$1", "symbols": ["match$ebnf$1$subexpression$1$ebnf$1", (lexer.has("union") ? {type: "union"} : union), "match$ebnf$1$subexpression$1$ebnf$2", "expression", "_", {"literal":"->"}, "_", "expression"]},
    {"name": "match$ebnf$1", "symbols": ["match$ebnf$1$subexpression$1"]},
    {"name": "match$ebnf$1$subexpression$2$ebnf$1", "symbols": ["__"]},
    {"name": "match$ebnf$1$subexpression$2$ebnf$1", "symbols": ["match$ebnf$1$subexpression$2$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "match$ebnf$1$subexpression$2$ebnf$2", "symbols": ["__"]},
    {"name": "match$ebnf$1$subexpression$2$ebnf$2", "symbols": ["match$ebnf$1$subexpression$2$ebnf$2", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "match$ebnf$1$subexpression$2", "symbols": ["match$ebnf$1$subexpression$2$ebnf$1", (lexer.has("union") ? {type: "union"} : union), "match$ebnf$1$subexpression$2$ebnf$2", "expression", "_", {"literal":"->"}, "_", "expression"]},
    {"name": "match$ebnf$1", "symbols": ["match$ebnf$1", "match$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "match$ebnf$2$subexpression$1$ebnf$1", "symbols": ["__"]},
    {"name": "match$ebnf$2$subexpression$1$ebnf$1", "symbols": ["match$ebnf$2$subexpression$1$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "match$ebnf$2$subexpression$1$ebnf$2", "symbols": ["__"]},
    {"name": "match$ebnf$2$subexpression$1$ebnf$2", "symbols": ["match$ebnf$2$subexpression$1$ebnf$2", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "match$ebnf$2$subexpression$1", "symbols": ["match$ebnf$2$subexpression$1$ebnf$1", (lexer.has("union") ? {type: "union"} : union), "match$ebnf$2$subexpression$1$ebnf$2", {"literal":"otherwise"}, "_", {"literal":"->"}, "_", "expression"]},
    {"name": "match$ebnf$2", "symbols": ["match$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "match$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "match", "symbols": [{"literal":"match"}, "__", "expression", "match$ebnf$1", "match$ebnf$2"], "postprocess": B.match},
    {"name": "arguments$ebnf$1", "symbols": []},
    {"name": "arguments$ebnf$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "arguments$ebnf$1$subexpression$1$ebnf$1", "symbols": ["arguments$ebnf$1$subexpression$1$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "arguments$ebnf$1$subexpression$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws), "arguments$ebnf$1$subexpression$1$ebnf$1", "identifier"]},
    {"name": "arguments$ebnf$1", "symbols": ["arguments$ebnf$1", "arguments$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "arguments", "symbols": ["identifier", "arguments$ebnf$1"], "postprocess": B.fnArguments},
    {"name": "parameters$ebnf$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "parameters$ebnf$1$subexpression$1$ebnf$1", "symbols": ["parameters$ebnf$1$subexpression$1$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "parameters$ebnf$1$subexpression$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws), "parameters$ebnf$1$subexpression$1$ebnf$1", "parameter"]},
    {"name": "parameters$ebnf$1", "symbols": ["parameters$ebnf$1$subexpression$1"]},
    {"name": "parameters$ebnf$1$subexpression$2$ebnf$1", "symbols": []},
    {"name": "parameters$ebnf$1$subexpression$2$ebnf$1", "symbols": ["parameters$ebnf$1$subexpression$2$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "parameters$ebnf$1$subexpression$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws), "parameters$ebnf$1$subexpression$2$ebnf$1", "parameter"]},
    {"name": "parameters$ebnf$1", "symbols": ["parameters$ebnf$1", "parameters$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "parameters", "symbols": ["parameters$ebnf$1"], "postprocess": B.params},
    {"name": "parameter", "symbols": ["literal"], "postprocess": id},
    {"name": "parameter", "symbols": ["identifier"], "postprocess": id},
    {"name": "parameter", "symbols": ["parenthesis"], "postprocess": id},
    {"name": "function$subexpression$1$ebnf$1", "symbols": []},
    {"name": "function$subexpression$1$ebnf$1", "symbols": ["function$subexpression$1$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "function$subexpression$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws), "function$subexpression$1$ebnf$1"]},
    {"name": "function$subexpression$2$ebnf$1", "symbols": []},
    {"name": "function$subexpression$2$ebnf$1", "symbols": ["function$subexpression$2$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "function$subexpression$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws), "function$subexpression$2$ebnf$1"]},
    {"name": "function", "symbols": ["arguments", "function$subexpression$1", {"literal":"->"}, "function$subexpression$2", "expression"], "postprocess": B.func},
    {"name": "functionApplication$subexpression$1", "symbols": ["identifier"]},
    {"name": "functionApplication$subexpression$1", "symbols": ["property"]},
    {"name": "functionApplication$subexpression$1", "symbols": ["parenthesis"]},
    {"name": "functionApplication$ebnf$1", "symbols": [{"literal":"<|"}], "postprocess": id},
    {"name": "functionApplication$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "functionApplication", "symbols": ["functionApplication$subexpression$1", "_", "functionApplication$ebnf$1", "parameters"], "postprocess": B.backApply},
    {"name": "functionApplication", "symbols": ["parameters", {"literal":"|>"}, "identifier"], "postprocess": B.forwardApply},
    {"name": "opFunction$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "opFunction$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "opFunction$subexpression$1", "symbols": [{"literal":"*"}]},
    {"name": "opFunction$subexpression$1", "symbols": [{"literal":"/"}]},
    {"name": "opFunction$subexpression$1", "symbols": [{"literal":"<"}]},
    {"name": "opFunction$subexpression$1", "symbols": [{"literal":">"}]},
    {"name": "opFunction$subexpression$1", "symbols": [{"literal":"<="}]},
    {"name": "opFunction$subexpression$1", "symbols": [{"literal":">="}]},
    {"name": "opFunction$subexpression$1", "symbols": [{"literal":"=="}]},
    {"name": "opFunction$subexpression$1", "symbols": [{"literal":"&&"}]},
    {"name": "opFunction$subexpression$1", "symbols": [{"literal":"||"}]},
    {"name": "opFunction$subexpression$1", "symbols": [{"literal":">>"}]},
    {"name": "opFunction$subexpression$1", "symbols": [{"literal":"<<"}]},
    {"name": "opFunction$subexpression$1", "symbols": [{"literal":"<>"}]},
    {"name": "opFunction$ebnf$1", "symbols": ["expression"], "postprocess": id},
    {"name": "opFunction$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "opFunction", "symbols": ["opFunction$subexpression$1", "_", "opFunction$ebnf$1"], "postprocess": B.opFunction},
    {"name": "decorator", "symbols": [{"literal":"@"}, "identifier"], "postprocess": B.decorator},
    {"name": "decorator$ebnf$1", "symbols": ["__"]},
    {"name": "decorator$ebnf$1", "symbols": ["decorator$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decorator$ebnf$2", "symbols": []},
    {"name": "decorator$ebnf$2$subexpression$1$ebnf$1", "symbols": []},
    {"name": "decorator$ebnf$2$subexpression$1$ebnf$1", "symbols": ["decorator$ebnf$2$subexpression$1$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decorator$ebnf$2$subexpression$1$ebnf$2", "symbols": []},
    {"name": "decorator$ebnf$2$subexpression$1$ebnf$2", "symbols": ["decorator$ebnf$2$subexpression$1$ebnf$2", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decorator$ebnf$2$subexpression$1", "symbols": ["decorator$ebnf$2$subexpression$1$ebnf$1", {"literal":","}, "decorator$ebnf$2$subexpression$1$ebnf$2", "expression"]},
    {"name": "decorator$ebnf$2", "symbols": ["decorator$ebnf$2", "decorator$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decorator", "symbols": [{"literal":"@"}, "identifier", "decorator$ebnf$1", "expression", "decorator$ebnf$2"], "postprocess": B.decorator},
    {"name": "operation", "symbols": ["algebraic"], "postprocess": B.operations.algebraic},
    {"name": "operation", "symbols": ["logic"], "postprocess": B.operations.logic},
    {"name": "operation", "symbols": ["condition"], "postprocess": B.operations.condition},
    {"name": "operation", "symbols": ["composition"], "postprocess": B.operations.composition},
    {"name": "operation", "symbols": ["concatenation"], "postprocess": B.operations.concatenation},
    {"name": "logic$subexpression$1", "symbols": ["identifier"]},
    {"name": "logic$subexpression$1", "symbols": ["literal"]},
    {"name": "logic$subexpression$1", "symbols": ["property"]},
    {"name": "logic$subexpression$1", "symbols": ["functionApplication"]},
    {"name": "logic$subexpression$1", "symbols": ["parenthesis"]},
    {"name": "logic$subexpression$2", "symbols": [{"literal":"||"}]},
    {"name": "logic$subexpression$2", "symbols": [{"literal":"&&"}]},
    {"name": "logic", "symbols": ["logic$subexpression$1", "_", "logic$subexpression$2", "_", "expression"], "postprocess": B.andOr},
    {"name": "logic", "symbols": [{"literal":"!"}, "expression"], "postprocess": B.not},
    {"name": "algebraic$subexpression$1", "symbols": ["identifier"]},
    {"name": "algebraic$subexpression$1", "symbols": ["literal"]},
    {"name": "algebraic$subexpression$1", "symbols": ["property"]},
    {"name": "algebraic$subexpression$1", "symbols": ["functionApplication"]},
    {"name": "algebraic$subexpression$1", "symbols": ["parenthesis"]},
    {"name": "algebraic$subexpression$2", "symbols": [{"literal":"+"}]},
    {"name": "algebraic$subexpression$2", "symbols": [{"literal":"-"}]},
    {"name": "algebraic$subexpression$2", "symbols": [{"literal":"*"}]},
    {"name": "algebraic$subexpression$2", "symbols": [{"literal":"/"}]},
    {"name": "algebraic", "symbols": ["algebraic$subexpression$1", "_", "algebraic$subexpression$2", "_", "expression"], "postprocess": B.algebraic},
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
    {"name": "condition", "symbols": ["condition$subexpression$1", "_", "condition$subexpression$2", "_", "expression"], "postprocess": B.condition},
    {"name": "composition$subexpression$1", "symbols": ["identifier"]},
    {"name": "composition$subexpression$1", "symbols": ["function"]},
    {"name": "composition$subexpression$1", "symbols": ["property"]},
    {"name": "composition$subexpression$1", "symbols": ["functionApplication"]},
    {"name": "composition$subexpression$1", "symbols": ["parenthesis"]},
    {"name": "composition$subexpression$2", "symbols": [{"literal":"<<"}]},
    {"name": "composition$subexpression$2", "symbols": [{"literal":">>"}]},
    {"name": "composition", "symbols": ["composition$subexpression$1", "_", "composition$subexpression$2", "_", "expression"], "postprocess": B.composition},
    {"name": "concatenation$subexpression$1", "symbols": ["identifier"]},
    {"name": "concatenation$subexpression$1", "symbols": ["literal"]},
    {"name": "concatenation$subexpression$1", "symbols": ["property"]},
    {"name": "concatenation$subexpression$1", "symbols": ["functionApplication"]},
    {"name": "concatenation$subexpression$1", "symbols": ["parenthesis"]},
    {"name": "concatenation", "symbols": ["concatenation$subexpression$1", "_", {"literal":"<>"}, "_", "expression"], "postprocess": B.concatenation},
    {"name": "script$ebnf$1", "symbols": []},
    {"name": "script$ebnf$1", "symbols": ["script$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "script$ebnf$2", "symbols": ["expression"], "postprocess": id},
    {"name": "script$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "script$ebnf$3", "symbols": []},
    {"name": "script$ebnf$3$subexpression$1", "symbols": ["wrapped"]},
    {"name": "script$ebnf$3", "symbols": ["script$ebnf$3", "script$ebnf$3$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "script$ebnf$4", "symbols": ["__"], "postprocess": id},
    {"name": "script$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "script", "symbols": ["script$ebnf$1", "imports", "script$ebnf$2", "script$ebnf$3", "script$ebnf$4"], "postprocess": B.script},
    {"name": "wrapped$ebnf$1", "symbols": []},
    {"name": "wrapped$ebnf$1", "symbols": ["wrapped$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "wrapped", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl), "wrapped$ebnf$1", "expression"], "postprocess": B.wrap},
    {"name": "imports$ebnf$1", "symbols": []},
    {"name": "imports$ebnf$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "imports$ebnf$1$subexpression$1$ebnf$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "imports$ebnf$1$subexpression$1$ebnf$1$subexpression$1$ebnf$1", "symbols": ["imports$ebnf$1$subexpression$1$ebnf$1$subexpression$1$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "imports$ebnf$1$subexpression$1$ebnf$1$subexpression$1", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl), "imports$ebnf$1$subexpression$1$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "imports$ebnf$1$subexpression$1$ebnf$1", "symbols": ["imports$ebnf$1$subexpression$1$ebnf$1", "imports$ebnf$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "imports$ebnf$1$subexpression$1", "symbols": ["import", "imports$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "imports$ebnf$1", "symbols": ["imports$ebnf$1", "imports$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "imports", "symbols": ["imports$ebnf$1"], "postprocess": id},
    {"name": "import$ebnf$1$subexpression$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "import$ebnf$1$subexpression$1$subexpression$1$ebnf$1", "symbols": ["import$ebnf$1$subexpression$1$subexpression$1$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "import$ebnf$1$subexpression$1$subexpression$1", "symbols": ["__", "import$ebnf$1$subexpression$1$subexpression$1$ebnf$1"]},
    {"name": "import$ebnf$1$subexpression$1", "symbols": ["import$ebnf$1$subexpression$1$subexpression$1", {"literal":"foreign"}]},
    {"name": "import$ebnf$1", "symbols": ["import$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "import$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "import$subexpression$1$ebnf$1", "symbols": []},
    {"name": "import$subexpression$1$ebnf$1", "symbols": ["import$subexpression$1$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "import$subexpression$1", "symbols": ["__", "import$subexpression$1$ebnf$1"]},
    {"name": "import$subexpression$2$ebnf$1", "symbols": []},
    {"name": "import$subexpression$2$ebnf$1", "symbols": ["import$subexpression$2$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "import$subexpression$2", "symbols": ["__", "import$subexpression$2$ebnf$1"]},
    {"name": "import$subexpression$3$ebnf$1", "symbols": []},
    {"name": "import$subexpression$3$ebnf$1", "symbols": ["import$subexpression$3$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "import$subexpression$3", "symbols": ["__", "import$subexpression$3$ebnf$1"]},
    {"name": "import", "symbols": [{"literal":"import"}, "import$ebnf$1", "import$subexpression$1", "string", "import$subexpression$2", {"literal":"as"}, "import$subexpression$3", "identifier"], "postprocess": B.importModule},
    {"name": "export$subexpression$1$ebnf$1", "symbols": []},
    {"name": "export$subexpression$1$ebnf$1", "symbols": ["export$subexpression$1$ebnf$1", "__"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "export$subexpression$1", "symbols": ["__", "export$subexpression$1$ebnf$1"]},
    {"name": "export", "symbols": [{"literal":"export"}, "export$subexpression$1", "expression"], "postprocess": B.exportModule}
]
  , ParserStart: "script"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
