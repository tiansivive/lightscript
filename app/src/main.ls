import '../lib/react.l.js' as R
import 'chat/panel' as C

R.mount (C.render {
    messages: [
        { user: 'tiansivive', text: 'hello world!' },
        { user: 'bot', text: 'This is your chat!' },
        { user: 'anonymous', text: 'ping' }
    ],
    handlers: { onChange: console.log }
} [])