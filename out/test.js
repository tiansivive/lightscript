import * as R from 'react-dom';
import * as app from './app';
R.render(
    (app.main({},[])),
    (document.getElementById("app"))
    );