import { evaluate } from '../evaluation'

export const ifThenElse = (expr, scope) => (evaluate(expr.condition, scope) ? evaluate(expr.truthy, scope) : evaluate(expr.falsy, scope))
