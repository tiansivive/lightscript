@{%
	const moo = require('moo')
	const B = require('./builder/index.js')
	const lexer = moo.compile({
		
		keywords: /(?:if|then|else|do|unless|where|match|when|case|of|otherwise|let|in|not|and|or|import|export|from|to|module|as|type|instance)\b/,
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
		identifier: /[a-zA-Z_]\w*/,
		digits:  /[0-9]+/,
		string:  /'(?:\\["\\]|[^\n"\\])*'|"(?:\\["\\]|[^\n"\\])*"/

	});
%}

@lexer lexer


### SCRIPT
script -> __:* imports expression (wrapped):* __:? {% B.script %}

wrapped -> %nl __:* expression {% B.wrap %}

imports -> (import (%nl __:*)):*

### MODULES

import -> "import" (__ __:*) identifier (__ __:*) "from" (__ __:*) string {% B.importModule %}

export -> "export" (__ __:*) expression {% B.exportModule %}
		 
		 
### EXPRESSIONS		 

expression -> identifier {% id %}
			| literal {% B.expressions.literal %}
			| assignment {% id %}	
 			| parenthesis  {% id %}
			| property {% id %}
			| operation {% id %}
			| ifThenElse {% B.expressions.ifThenElse %}
			| match {% B.expressions.match %}
			| function {% id %}
 			| functionApplication {% id %}
			# | (%binaryOp | %unaryOp) {% B.expressions.ops %}
	
parenthesis -> "(" _ expression _ ")" {% B.parenthesis %}

identifier -> %identifier {% B.identifier %}

literal -> number {% B.literals.number %} 
		 | string {% B.literals.string %}
		 | boolean {% B.literals.boolean %}
 		 | tuple {% B.literals.tuple %} 
 		 | list {% B.literals.list %} 
 		 | record {% B.literals.record %} 
		 | graph {% id %} 
		 | graphPattern {% id %}

assignment -> identifier _ "=" _ expression {% B.assignment %}

property -> (record | identifier | parenthesis | property ) %dot identifier {% B.property %}

operation -> algebraic {% B.operations.algebraic %} 
		   | logic {% B.operations.logic %} 
		   | condition {% B.operations.condition %} 
		   | composition {% B.operations.composition %} 
		   | concatenation {% B.operations.concatenation %} 
		   | graphQuery {% B.operations.graphQuery %} 
		   | graphMutation {% B.operations.graphMutation %} 
		   
	

# ### CONTROL FLOW

ifThenElse -> "if" __ expression __:+ "then" __ expression __:+ "else" __ expression {% B.ifThenElse %}
match -> "match" __ expression (__:+ %union __:+ expression _ "->" _ expression):+ (__:+ %union __:+ "otherwise" _ "->" _ expression):? {% B.match %}


# ### OPERATIONS
# maybe use a Macro for this Union here?
logic -> (identifier | literal | property | functionApplication | parenthesis) _ ("||" | "&&") _ expression {% B.andOr %}
	   | "!" expression {% B.not %}
	   
algebraic -> (identifier | literal | property | functionApplication | parenthesis) _ ("+" | "-" | "*" | "/") _ expression {% B.algebraic %}	   
condition -> (identifier | literal | property | functionApplication | parenthesis) _ ("<" | ">" | "<=" | ">=" | "==") _ expression {% B.condition %}
composition -> (identifier | function | property | functionApplication | parenthesis) _ ("<<" | ">>" ) _ expression {% B.composition %}
concatenation -> (identifier | literal | property | functionApplication | parenthesis) _ "<>" _ expression {% B.concatenation %}
graphQuery -> (identifier | graph | parenthesis) _ "|-" _ (identifier | graphPattern | parenthesis)  {% B.graphQuery %}
graphMutation -> (identifier | graph | parenthesis) _ "-|" _ (identifier | graphPattern | parenthesis)  {% B.graphMutation %}

# ### FUNCTIONS

arguments -> identifier (%ws __:* identifier):* {% B.fnArguments %}  
		   
parameters -> (%ws __:* parameter):+ {% B.params %}
parameter -> literal {% id %}
		   | identifier {% id %}
 		   | parenthesis {% id %}
		   
function -> arguments (%ws __:*) "->" (%ws __:*) expression {% B.func %}
functionApplication -> identifier _ "<|":? parameters {% B.backApply %}
					 | parameters "|>" identifier {% B.forwardApply %}




# ### DATA TYPES

tuple -> "(" _ expression _ ("," _ expression _):+ ")" {% B.tuple %}
list -> "[" _ "]" {% () => [] %}
 	  | "[" _ expression _ ("," _ expression _):* "]" {% B.list %}
record -> "{" _ "}" {% () => [] %}
 		| "{" _ key _ ":" _ expression _ (","  _ key _ ":" _ expression _):* "}" {% B.record %}

key -> identifier {% B.key %}
 	 #| string {% id %}
 	 #| functionApplication {% id %}


graph -> %lchevron __:* %rchevron {% B.emptyGraph %}
	   | %lchevron __:* (graphPattern | identifier | parenthesis) __:* ("," __:* (graphPattern | identifier | parenthesis) __:*):* %rchevron {% B.graph %}

gNode -> "(" _ (":" identifier):* ")" {% ([,, labels]) => ({ type: "graph-node", value: { type: "any" }, labels: labels.map(([, label]) => label.value) }) %}
       | "(" identifier _ (":" identifier):* ")" {% ([, id ,, labels, ]) => ({ type: "graph-node", value: id, labels: labels.map(([, label]) => label.value) }) %}
gRelId -> "[" _ (":" identifier):* "]" {% ([,, labels]) => ({ type: "any", labels: labels.map(([, label]) => label.value) }) %}
		| "[" identifier _ (":" identifier):* "]" {% ([, id ,, labels, ]) => ({ ...id, labels: labels.map(([, label]) => label.value) }) %}
gRel -> "-" gRelId:? "-"  {% ([, { type, value, labels },]) => ({ type: "graph-edge", direction: "bilateral", value: { type, value}, labels }) %}
	  | "-" gRelId:? "->" {% ([, { type, value, labels },]) => ({ type: "graph-edge", direction: "outgoing", value: { type, value}, labels }) %}
	  | "<-" gRelId:? "-" {% ([, { type, value, labels },]) => ({ type: "graph-edge", direction: "incoming", value: { type, value}, labels }) %}
	 
graphPattern -> gNode gRel gNode (gRel gNode):*
	{% ([first, edge, second, rest]) => ({
			type: "graph-pattern",
			value: rest.reduce(
				(pat, [e, n]) => ([ ...pat, { first: pat[pat.length -1].second, edge: e, second: n } ]), 
				[{ first, second, edge }]
			)
		}) 
	%} 

# ### PRIMITIVES

string -> %string {% B.string %}
number -> %digits {% B.number %} 
 		| %digits %dot %digits {% B.fraction %} 
boolean -> %true  {% _ => true %} 
		 | %false {% _ => false %}


# Whitespace
_ -> (null | %ws | %nl) {% _ => null %}
__ -> (%ws|%nl) {% _ => null %}

