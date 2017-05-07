import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Welcome from './components/Welcome';
import './index.css';

ReactDOM.render(
  <App>
    <Router>
      <div>
        <Route exact path="/" component={Welcome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={Home} />
      </div>
    </Router>
  </App>,
  document.getElementById('root')
);
