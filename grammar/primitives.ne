@include "./lexer.ne"

identifier -> %identifier {% B.identifier %}

# ### PRIMITIVES

string -> %string {% B.string %}
number -> %digits {% B.number %} 
 		| %digits %dot %digits {% B.fraction %} 
boolean -> %true  {% _ => true %} 
		 | %false {% _ => false %}


# Whitespace
_ -> (null | %ws | %nl) {% _ => null %}
__ -> (%ws|%nl) {% _ => null %}

