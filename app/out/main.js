import * as R from '../lib/react.l.js';
import * as C from './chat/panel';
R.mount((C.render({messages:[{user:"tiansivive', text: 'hello world!"},{user:"bot', text: 'This is your chat!"},{user:"anonymous', text: 'ping"}],handlers:{onChange:console.log}},[])));
;