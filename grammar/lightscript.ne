
@include "./expressions.ne"

### SCRIPT
script -> __:* modules expression:? (wrapped):* __:? {% B.script %}
wrapped -> %nl __:* expression {% B.wrap %}
modules -> (import __:*):* export:? {% B.modules %}

### MODULES
import -> "import" (__ __:*) string (__ __:*) "as" (__ __:*) identifier {% B.importModule %}
export -> "export" (__ __:*) exportList:? (__ __:*) "where" {% B.exportModule %}
		 
exportList -> "(" __:* identifier (__:+ identifier):* __:* ")" {% ([,, head, tail]) => [head, ...tail.map(([, id]) => id)] %}
