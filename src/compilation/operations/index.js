import { zip } from "lodash/fp"


export const jsOp = (generator, expr) => {
    
    const { value: left } = generator(expr.left)
    const { value: right } = generator(expr.right)

    return `${left} ${expr.operator} ${right}`
}
  
export const concatenation = (generator, expr) => {
    
    const { value: left } = generator(expr.left)
    const { value: right } = generator(expr.right)

    return `((a, b) => {
        if(Array.isArray(left)){
          return Lo.concat(a, b);
        }
        if(typeof a === 'string'){
          return a + b;
        }
        return { ...a, ...b };
      })(${left}, ${right})`
}


export const composition = (generator, expr) => {
    
    const { value: left } = generator(expr.left)
    const { value: right } = generator(expr.right)

    switch(expr.operator){
        case '<<':
            return `((...args) => { return ${left}(${right}(...args)) })`
        case '>>':
            return `((...args) => { return ${right}(${left}(...args)) })`
    }
}
