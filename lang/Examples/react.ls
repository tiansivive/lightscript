
module Counter where

type state = { count: int }

type action = Increment
            | Decrement

initialState = {count: 0}

reducer = state -> match
  | Increment => {count: state.count + 1}
  | Decrement => {count: state.count - 1}
  

@with (state, dispatch) = React.useReducer(reducer, initialState)
render = _ -> 
  <div>
    <div>Count: {state.count}</div>
    <div>
      <button onClick={dispatch Increment}> + </button>
      <button onClick={dispatch Decrement}> - </button>
    </div>
  </div>

