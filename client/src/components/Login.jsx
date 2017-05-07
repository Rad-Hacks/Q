import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <form className="login">
        <p className="title">Log in</p>
        <input type="text" placeholder="Username" autoFocus />
        <i className="fa fa-user" />
        <input type="password" placeholder="Password" />
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
