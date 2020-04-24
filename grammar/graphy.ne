



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
