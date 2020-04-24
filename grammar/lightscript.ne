
@include "./expressions.ne"

### SCRIPT
script -> __:* imports expression (wrapped):* __:? {% B.script %}
wrapped -> %nl __:* expression {% B.wrap %}
imports -> (import (%nl __:*)):*

### MODULES
import -> "import" (__ __:*) identifier (__ __:*) "from" (__ __:*) string {% B.importModule %}
export -> "export" (__ __:*) expression {% B.exportModule %}
		 

