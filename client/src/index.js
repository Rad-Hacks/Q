import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './App.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Welcome from './components/Welcome.jsx';
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
