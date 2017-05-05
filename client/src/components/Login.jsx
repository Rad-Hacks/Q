import React, { Component } from 'react';
<<<<<<< HEAD
=======
import $ from 'jquery';
import ReactCSSTG from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
>>>>>>> add get request to server
import './Login.css';
import googleBtn from './btn_google_signin.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleSubmit() {
    fetch('http://localhost:8080/api/login', {
      method: 'post',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    });
  }
  render() {
    return (
      <form className="login">
        <p className="title">Log in</p>
        <input
          type="text" placeholder="Username" autoFocus
          onChange={(e) => { this.setState({ username: e.target.value }); }}
        />
        <i className="fa fa-user" />
        <input
          type="password" placeholder="Password"
          onChange={(e) => { this.setState({ password: e.target.value }); }}
        />
        <i className="fa fa-key" />
        <button onClick={() => this.handleSubmit}>
          <i className="spinner" />
          <span className="state">Log in</span>
        </button>
      </form>
    );
  }
}
export default Login;
