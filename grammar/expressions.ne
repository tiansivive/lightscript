
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
			| do {% id %}
			| decorator %nl expression {% B.expressions.decorate %}
	
parenthesis -> "(" __:* expression __:* ")" {% B.parenthesis %}

assignment -> identifier __:* "=" __:* expression {% B.assignment %}
property -> (record | identifier | parenthesis | property ) %dot identifier {% B.property %}

binding -> identifier __:* "<-" __:* expression {% B.binding %}
do -> "do" __ expression (__:* ("," | %nl) __:* ( expression | binding )):* {% B.doExpressions %}

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
functionApplication -> ( identifier | property | parenthesis) _ "<|":? parameters {% B.backApply %}
					 | parameters "|>" identifier {% B.forwardApply %}

opFunction -> ("+" | "-" | "*" | "/" | "<" | ">" | "<=" | ">=" | "==" | "&&" | "||" | ">>" | "<<" | "<>") _ expression:? {% B.opFunction %}

decorator -> "@" identifier {% B.decorator %}
					 | "@" identifier __:+ expression (__:* "," __:* expression):* {% B.decorator %}

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



