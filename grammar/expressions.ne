
@include "./datatypes.ne"

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
			| opFunction {% id %} 
			# | (%binaryOp | %unaryOp) {% B.expressions.ops %}
	
parenthesis -> "(" _ expression _ ")" {% B.parenthesis %}

assignment -> identifier _ "=" _ expression {% B.assignment %}
property -> (record | identifier | parenthesis | property ) %dot identifier {% B.property %}

# ### CONTROL FLOW
ifThenElse -> "if" __ expression __:+ "then" __ expression __:+ "else" __ expression {% B.ifThenElse %}
match -> "match" __ expression (__:+ %union __:+ expression _ "->" _ expression):+ (__:+ %union __:+ "otherwise" _ "->" _ expression):? {% B.match %}


# ### FUNCTIONS
arguments -> identifier (%ws __:* identifier):* {% B.fnArguments %}  
		   
parameters -> (%ws __:* parameter):+ {% B.params %}
parameter -> literal {% id %}
		   | identifier {% id %}
 		   | parenthesis {% id %}
		   
function -> arguments (%ws __:*) "->" (%ws __:*) expression {% B.func %}
functionApplication -> identifier _ "<|":? parameters {% B.backApply %}
					 | parameters "|>" identifier {% B.forwardApply %}

opFunction -> ("+" | "-" | "*" | "/" | "<" | ">" | "<=" | ">=" | "==" | "&&" | "||" | ">>" | "<<" | "<>") _ expression:? {% B.opFunction %}


# ### OPERATIONS
operation -> algebraic {% B.operations.algebraic %} 
		   | logic {% B.operations.logic %} 
		   | condition {% B.operations.condition %} 
		   | composition {% B.operations.composition %} 
		   | concatenation {% B.operations.concatenation %} 
		   
logic -> (identifier | literal | property | functionApplication | parenthesis) _ ("||" | "&&") _ expression {% B.andOr %}
	   | "!" expression {% B.not %}
	   
algebraic -> (identifier | literal | property | functionApplication | parenthesis) _ ("+" | "-" | "*" | "/") _ expression {% B.algebraic %}	   
condition -> (identifier | literal | property | functionApplication | parenthesis) _ ("<" | ">" | "<=" | ">=" | "==") _ expression {% B.condition %}
composition -> (identifier | function | property | functionApplication | parenthesis) _ ("<<" | ">>" ) _ expression {% B.composition %}
concatenation -> (identifier | literal | property | functionApplication | parenthesis) _ "<>" _ expression {% B.concatenation %}



