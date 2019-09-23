
const scopes =
[
  {
    scope: 'global',
    identifiers: []
  },

  {
    scope: 'global.module',
    identifiers: []
  }

]

const currentScope = ['global', 'module']

export const popScope = _ => currentScope.pop()
export const pushScope = name => {
  currentScope.push(name)
}

export const addToCurrentScope = (name, value) => {
  const path = currentScope.join('.')
  const index = scopes.findIndex(({ scope }) => scope === path)

  if (index < 0) {
    scopes.push({
      scope: path,
      identifiers: [{ name, value }]
    })
  } else scopes[index].identifiers.push({ name, value })
}

export const find = id => {
  const current = currentScope.join('.')
  const match = scopes
    .filter(({ scope }) => current.startsWith(scope))
    .reduce((ids, { identifiers }) => [...identifiers, ...ids], [])
    .find(({ name }) => name === id)

  if (!match) throw new Error(`Undefined identifier ${id}`)

  return match.value
}
