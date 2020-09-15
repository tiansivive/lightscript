import 'lodash/fp' as L
import '../../lib/react.l.js' as R
import './form' as F
import './message' as M

export (render) where

render = props -> R.html.div {} [
    (L.map M.render) props.messages,
    F.render props.handlers
]