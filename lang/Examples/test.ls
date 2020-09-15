import 'lodash' as L
import '../../lib/react.l.js' as R
import './chat/panel' as C
import './form' as F
import './message' as M


chat = props -> R.html.div {} [
    (L.map M.render) props.messages,
    F.render props.handlers
]


mg = props -> R.html.div {} [
    R.html.span {} [props.user],
    R.html.span {} [props.text]
]

input = props -> R.html.input props []


R.mount (C.render {
    messages: [
        { user: 'tiansivive', text: 'hello world!' },
        { user: 'bot', text: 'This is your chat!' },
        { user: 'anonymous', text: 'ping' }
    ],
    handlers: { onChange: console.log }
} [])