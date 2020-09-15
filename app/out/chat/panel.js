import * as L from 'lodash/fp';
import * as R from '../../lib/react.l.js';
import * as F from './form';
import * as M from './message';
const render = (props) => R.html.div({},[(L.map(M.render))(props.messages),F.render(props.handlers)]);
export {render};