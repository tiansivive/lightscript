

export const transforms = {
  fromJS: (jsVal, scope) => {
    if(Array.isArray(jsVal)) return {
      type: 'list',
      value: jsVal
    }
    
    if(typeof jsVal === 'function') return {
      type:'function',
      body: jsVal,
      foreign: true,
      args: Array(jsVal.length).fill(0).map((_, i) => `__${jsVal.name}__arg_${i}__`),
      closure: scope
    }

    if(typeof jsVal === 'object') return {
      type: 'record',
      value: jsVal
    }

    return {
      type: typeof jsVal,
      value: jsVal
    }
  },
  toJS: (val, scope) => {

  }
} 