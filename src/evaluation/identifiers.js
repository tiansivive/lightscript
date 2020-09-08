


export const find = (identifier, scope) => {

  const found = scope.identifiers.find(({ id }) => id === identifier)
  if (!found) throw new Error(`Undefined identifier ${identifier}`)

  return found
}
