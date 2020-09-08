

/**
 * @typedef { { type: "identifier", value: string } } IdExpression
 * @typedef {{ type: "function-application", id: IdExpression, params: any[]}} FnApplicationExpression
 * @typedef {{ type: "assignment", id: IdExpression, value: *}} AssignmentExpression
 * @typedef { Object } Expression
 * @typedef { string } Expression.type
 * @typedef {{ id: string, value: * }} Identifier 
 * @typedef {{ identifiers: Identifier[] }} Scope 
 */