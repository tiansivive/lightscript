@{%
  const moo = require('moo')
  const lexer = moo.compile({
    ws:     /[ \t]+/,
  });
%}

# Pass your lexer object using the @lexer option:
@lexer lexer


### PRIMITIVES


#string -> "'" (alfanumeric _):* "'" {% ([, chars,]) => chars.map(([c, ws]) => c + ws).join("") %}
#number -> digits {% digits => +digits %} 
# 				| digits %dot digits {% fractional => +(fractional.join("")) %} 
#boolean -> %true  {% _ => true %} 
#		 		 | %false {% _ => false %}
		
		
### TOKENS		
		
# digits -> [0-9]:+ {% ([digits]) => digits.join("") %}
# char -> [a-zA-Z] {% id %}
# alfanumeric -> [a-zA-Z0-9] {% id %}

# Whitespace
_ -> (null | " " _) {% _ => null %}
__ -> (" " | " " __) {% _ => null %}
