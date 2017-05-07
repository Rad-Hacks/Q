import React, { Component } from 'react';
import $ from 'jquery';

class Login extends Component {

  render() {
    return (
      <form className="login">
        <p className="title">Log in</p>
        <input type="text" placeholder="Email" />
        <i className="fa fa-envelope" />
        <input type="text" placeholder="Username" autoFocus />
        <i className="fa fa-user" />
        <input type="password" placeholder="Password" />
        <i className="fa fa-key" />
        <input type="text" placeholder="City" />
        <i className="fa fa-location-arrow" />
        <input type="text" placeholder="State" />
        <i className="fa fa-location-arrow" />
        <input type="text" placeholder="Phone" />
        <i className="fa fa-phone" />

        <button onClick={() => this.handleSubmit}>
          <i className="spinner" />
          <span className="state">Log in</span>
        </button>
      </form>
    );
  }

}

export default Login;
