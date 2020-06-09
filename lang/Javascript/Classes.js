import L from 'lodash'


class Example {

  constructor(props){
    this.state = { 
      props,
      values: [], 
      counter: 0
    }
  }


  increment(){
    this.setState(({ counter }) => ({ counter: ++counter }))
  }

  decrement(){
    this.setState(({ counter }) => ({ counter: --counter }))
  }

  setState(updater){
    L.merge(this.state, updater(this.state))
  }

  read(keys){
    return keys ? L.pick(this.state, keys) : this.state
  }
}


export const make = props => new Example(props)


export const test = p => {

  const e = new Example(p)
  console.log('Made a new Example:', e)

  console.log('1 - Counter:', e.read(['counter']))
  const inc = e['increment'].bind(e)
  e.increment()
  console.log('2 - Counter:', e.read(['counter']))
  inc()
  console.log('3 - Counter:', e.read(['counter']))




}