@{%
	const moo = require('moo')
	const lexer = moo.compile({
		
		keywords: /(?:if|then|else|do|unless|where|match|when|case|of|otherwise|let|in|not|and|or|import|export|from|to|module|as|type|instance)\b/,
		true:   /(?:true|on|active|yes|enabled)\b/,
		false:  /(?:false|off|inactive|no|disabled)\b/,
		rarrow: "->",
		larror: "<-",
		binaryOp: ["+", "-", "*", "/", "<", ">", "<=", ">=", "==", "&&", "||", "|>", "<|", ">>", "<<", "<>"],
		unaryOp: ["!", "++", "--", "?"],				  
		assignment: "=",
		delimiter: ["{", "}", "[", "]", "(", ")"],				
		comma: ",",
		colon: ":",
		union: "|",	
		ws: /[ \t]+/,
		nl:  { match: /\n+/, lineBreaks: true },
		dot: /\./,		
		identifier: /[a-zA-Z_]\w*/,
		digits:  /[0-9]+/,
		string:  /'(?:\\["\\]|[^\n"\\])*'|"(?:\\["\\]|[^\n"\\])*"/

	});
%}

@lexer lexer


### SCRIPT


script -> __:* expression (wrapped):* __:? {% ([,head, tail]) => {
	const arr = tail ? tail.map(([ expr]) => expr) : []
	return { type: "script", val: [ {type: 'expression', value: head }, ...arr] }
} %}

wrapped -> %nl __:* expression {% ([,,e]) => ({type: 'expression', value: e }) %}
		 
		 
### EXPRESSIONS		 

expression -> identifier {% id %}
			| literal {% ([literal]) => ({type: "literal", value: literal }) %}
			| assignment {% id %}	
 			| parenthesis  {% id %}
			| property {% id %}
			| operation {% id %}
			| ifThenElse {% ([expr]) => ({type: "control-flow", value: expr })  %}
			| match {% ([expr]) => ({type: "control-flow", value: expr })  %}
			| function {% id %}
 			| functionApplication {% id %}
			| (%binaryOp | %unaryOp) {% ([[op]]) => ({ type: "operator-function", operator: { type: op.type, value: op.value } }) %}
	
parenthesis -> "(" _ expression _ ")" {% ([,, expr,,]) => ({type: "parenthesis", value: expr }) %}

identifier -> %identifier {% ([{ type, value }]) => ({type, value}) %}

literal -> number {% ([num]) => ({type: 'number', value: num}) %} 
		 | string {% ([str]) => ({type: 'string', value: str}) %}
		 | boolean {% ([boolean]) => ({type: "boolean", value: boolean}) %}
 		 | tuple {% ([tuple]) => ({type: 'tuple', value: tuple}) %} 
 		 | list {% ([list]) => ({type: 'list', value: list}) %} 
 		 | record {% ([record]) => ({type: 'record', value: record}) %} 

assignment -> identifier _ "=" _ expression {% ([id,, equals,, expression]) => ({ type: "assignment", id, value: expression }) %}

property -> (record | identifier | parenthesis | property ) %dot identifier {% ([[context],, value]) => ({type: "property", context, value }) %}

operation -> algebraic {% ([math]) => ({type: 'math', ...math}) %} 
		   | logic {% ([logic]) => ({type: 'logical', ...logic}) %} 
		   | condition {% ([condition]) => ({type: 'conditional', ...condition}) %} 
		   | composition {% ([composition]) => ({type: 'composition', ...composition}) %} 
		   | concatenation {% ([concatenation]) => ({type: 'concatenation', ...concatenation}) %} 
	

# ### CONTROL FLOW

ifThenElse -> "if" __ expression __:+ "then" __ expression __:+ "else" __ expression {% ([ ,,condition,, ,,truthy,, ,,falsy]) => ({ type: "if-then-else", condition, truthy, falsy }) %}
match -> "match" __ expression (_ %union _ expression _ "->" _ expression):+ (_ %union _ "otherwise" _ "->" _ expression):?
{% ([,, expression, patterns, otherwise]) => ({ 
	type: "match", 
	expression,
	patterns: patterns.map(([,,, evaluation,,,, value]) => ({ evaluation, value })), 
	otherwise: otherwise ? otherwise[otherwise.length -1] : null 
}) %}



# ### OPERATIONS
# maybe use a Macro for this Union here?
logic -> (identifier | literal | property | functionApplication | parenthesis) _ ("||" | "&&") _ expression {% ([[left],, [op],, right]) => ({operator: op.value, left, right}) %}
	   | "!" expression {% ([op, expression]) => ({operator: op.value, expression}) %}
	   
algebraic -> (identifier | literal | property | functionApplication | parenthesis) _ ("+" | "-" | "*" | "/") _ expression {% ([[left],, [op],, right]) => ({operator: op.value, left, right}) %}	   
condition -> (identifier | literal | property | functionApplication | parenthesis) _ ("<" | ">" | "<=" | ">=" | "==") _ expression {% ([[left],, [op],, right]) => ({operator: op.value, left, right}) %}
composition -> (identifier | function | property | functionApplication | parenthesis) _ ("<<" | ">>" ) _ expression {% ([[left],, [op],, right]) => ({operator: op.value, left, right}) %}
concatenation -> (identifier | literal | property | functionApplication | parenthesis) _ "<>" _ expression {% ([[left],, op,, right]) => ({operator: op.value, left, right}) %}



# ### FUNCTIONS

arguments -> identifier (%ws __:* identifier):* {% ([arg, args]) => [arg.value, ...args.map(([,, a]) => a.value)] %}  
		   
parameters -> (%ws __:* parameter):+ {% ([params]) => params.map(([,, p]) => p) %}
parameter -> literal {% id %}
		   | identifier {% id %}
 		   | parenthesis {% id %}
		   
function -> arguments _ "->" _ expression {% ([args,, arrow,, expression]) => ({ type: "function", args, value: expression }) %}
functionApplication -> identifier _ "<|":? parameters {% ([id,, pipeline, params]) => ({ type: "function-application", id, params }) %}
					 | parameters "|>" identifier {% ([params, pipeline, id]) => ({ type: "function-application", id, params }) %}




# ### DATA TYPES

tuple -> "(" _ expression _ ("," _ expression _):+ ")" {% ([,, expr,, rest,]) => [expr, ...rest.map(([,, xpr,]) => xpr)] %}
list -> "[" _ "]" {% () => [] %}
 	  | "[" _ expression _ ("," _ expression _):* "]" {% ([,, expr,, rest,]) => [expr, ...rest.map(([,, xpr,]) => xpr)] %}
record -> "{" _ "}" {% () => ({ }) %}
 		| "{" _ key _ ":" _ expression _ (","  _ key _ ":" _ expression _):* "}" {% ([,, key,, colon,, value,, rest,]) => [{ key, value }, ...rest.map(([,,k,,,,v,]) => ({ key: k, value: v })) ] %}

key -> identifier {% ([id]) => id.value %}
 	 #| string {% id %}
 	 #| functionApplication {% id %}




# ### PRIMITIVES

string -> %string {% ([{ value }]) => value.slice(1, value.length -1) %}
number -> %digits {% ([{ value }]) => +value %} 
 		| %digits %dot %digits {% ([whole,, fraction]) => +(whole.value + "." + fraction.value) %} 
boolean -> %true  {% _ => true %} 
		 | %false {% _ => false %}


# Whitespace
_ -> (null | %ws | %nl) {% _ => null %}
__ -> (%ws|%nl) {% _ => null %}

