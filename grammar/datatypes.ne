@include "./primitives.ne"


literal -> number {% B.literals.number %} 
		 | string {% B.literals.string %}
		 | boolean {% B.literals.boolean %}
 		 | tuple {% B.literals.tuple %} 
 		 | list {% B.literals.list %} 
 		 | record {% B.literals.record %} 

# ### DATA TYPES

tuple -> "(" __:* expression __:* ("," __:* expression):+ __:* ")" {% B.tuple %}
list -> "[" __:* "]" {% () => [] %}
 	  | "["  __:* expression __:* ("," __:* expression):* __:* "]" {% B.list %}
record -> "{" __:* "}" {% () => [] %}
 		| "{" __:* key __:* ":" __:* expression (__:* ","  __:* key __:* ":" __:* expression):* __:* "}" {% B.record %}

key -> identifier {% B.key %}
 	 #| string {% id %}
 	 #| functionApplication {% id %}
