import '../../lib/react.l.js' as R

export (render) where

render = props -> R.html.div {} [
    R.html.span {} [props.user],
    R.html.span {} [props.text]
]