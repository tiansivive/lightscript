import * as R from '../../lib/react.l.js';
const render = (props) => R.html.div(
    {},[
        R.html.span({},[props.user]),R.html.span({},[props.text])]);
export {render};