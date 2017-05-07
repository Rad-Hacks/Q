import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      city: '',
      state: '',
      phone: '',
      email: '',
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
        <input type="password" placeholder="City" />
        <i className="fa fa-location-arrow" />
        <input type="text" placeholder="State" />
        <i className="fa fa-location-arroe" />
        <input type="password" placeholder="Phone" />
        <i className="fa fa-phone" />
        <input type="password" placeholder="Email" />
        <i className="fa fa-email" />
        <button onClick={() => this.handleSubmit}>
          <i className="spinner" />
          <span className="state">Log in</span>
        </button>
      </form>
    );
  }

}

export default Login;
