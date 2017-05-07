import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './App';
import Signup from './components/Signup';
import Login from './components/Login';
import Welcome from './components/Welcome';
import './index.css';

ReactDOM.render(
  <Router>
    <div>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/welcome' component={Welcome} />
    </div>
  </Router>  ,
  document.getElementById('root')
);
