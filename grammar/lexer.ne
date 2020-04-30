@{%
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
		identifier: /[a-zA-Z_]\w*/,
		digits:  /[0-9]+/,
		string:  /'(?:\\["\\]|[^\n"\\])*'|"(?:\\["\\]|[^\n"\\])*"/

	});
%}

@lexer lexer

# Whitespace
_ -> (null | %ws | %nl) {% _ => null %}
__ -> (%ws|%nl) {% _ => null %}