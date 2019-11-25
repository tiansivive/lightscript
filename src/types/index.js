

/**
 * @typedef { { type: "identifier", value: string } } IdExpression
 * @typedef {{ type: "function-application", id: IdExpression, params: any[]}} FnApplicationExpression
 * @typedef {{ type: "assignment", id: IdExpression, value: *}} AssignmentExpression
 * @typedef { {
 *   type: string, 
 *   value?: *,
 *   context?: Object,
 *   id?: *,
 *   params?: any[],
 *   val?: Expression[]
 * } } Expression
 * @typedef {{ id: string, value: * }} Identifier 
 * @typedef {{ identifiers: Identifier[] }} Scope 
 */