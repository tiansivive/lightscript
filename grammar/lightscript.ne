
@include "./expressions.ne"

### SCRIPT
script -> __:* imports expression:? (wrapped):* __:? {% B.script %}
wrapped -> %nl __:* expression {% B.wrap %}
imports -> (import (%nl __:*):*):* {% id %}

### MODULES
import -> "import" ((__ __:*) "foreign"):? (__ __:*) string (__ __:*) "as" (__ __:*) identifier {% B.importModule %}
export -> "export" (__ __:*) expression {% B.exportModule %}
		 

