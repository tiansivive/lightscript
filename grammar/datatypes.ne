@include "./primitives.ne"


literal -> number {% B.literals.number %} 
		 | string {% B.literals.string %}
		 | boolean {% B.literals.boolean %}
 		 | tuple {% B.literals.tuple %} 
 		 | list {% B.literals.list %} 
 		 | record {% B.literals.record %} 

# ### DATA TYPES

tuple -> "(" _ expression _ ("," _ expression _):+ ")" {% B.tuple %}
list -> "[" _ "]" {% () => [] %}
 	  | "[" _ expression _ ("," _ expression _):* "]" {% B.list %}
record -> "{" _ "}" {% () => [] %}
 		| "{" _ key _ ":" _ expression _ (","  _ key _ ":" _ expression _):* "}" {% B.record %}

key -> identifier {% B.key %}
 	 #| string {% id %}
 	 #| functionApplication {% id %}
