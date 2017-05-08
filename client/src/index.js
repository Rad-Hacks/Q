import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <div>
      <Route path="/*" component={App} />
    </div>
  </Router>,
  document.getElementById('root'),
);
