import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import $ from 'jquery';

const GOOGLE_API = require('../config/google.js');

const GOOGLE_CLIENT_ID = GOOGLE_API.apiAuth;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      city: '',
      state: '',
      email: '',
      googErr: false,
      errMsg: null,
      userId: null,
    };
    // Bindings
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoogle = this.handleGoogle.bind(this);
    this.handleFailure = this.handleFailure.bind(this);
  }

  handleGoogle(response) {
    const userData = {
      username: response.profileObj.email,
      password: response.googleId.slice(0, 70),
      city: '',
      state: '',
      contactEmail: response.profileObj.email,
    };
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/api/googleusers',
      data: userData,
      success: (resp) => {
        this.props.handleLogin(resp);
      },
      error: (error) => {
        this.setState({
          googErr: true,
          errMsg: error,
        });
      },
    });
  }
  handleFailure(e) {
    e.preventDefault();
    this.setState({
      googErr: true,
      errMsg: 'unable to signup with google',
    });
  }
  handleSubmit() {
    const userObj = {
      username: this.state.username,
      password: this.state.password,
      city: this.state.city,
      state: this.state.state,
      email: this.state.email,
    };
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/api/usersCreate',
      data: userObj,
      success: (resp) => {
        this.props.handleLogin(resp);
      },
      error: (error) => {
        this.setState({
          googErr: true,
          errMsg: error,
        });
      },
    });
  }
  render() {
    return (
      <div className="container">
        <br />
        <br />
        <form className="login">
          <p className="title">Sign up</p>
          <input
            type="text" placeholder="Username" autoFocus
            onChange={(e) => { e.preventDefault(); this.setState({ username: e.target.value }); }}
          />
          <i className="fa fa-user" />
          <input
            type="password" placeholder="Password"
            onChange={(e) => { e.preventDefault(); this.setState({ password: e.target.value }); }}
          />
          <i className="fa fa-key" />
          <input
            type="text" placeholder="City"
            onChange={(e) => { e.preventDefault(); this.setState({ city: e.target.value }); }}
          />
          <i className="fa fa-location-arrow" />
          <input
            type="text" placeholder="State"
            onChange={(e) => { e.preventDefault(); this.setState({ state: e.target.value }); }}
          />
          <i className="fa fa-location-arrow" />
          <input
            type="text" placeholder="Email"
            onChange={(e) => { e.preventDefault(); this.setState({ email: e.target.value }); }}
          />
          <i className="fa fa-envelope" />
          <button onClick={this.handleSubmit}>
            <i className="spinner" />
            <span className="state">Sign Up</span>
          </button>
        </form>
        <br />
        <br />
        <div>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Sign Up with Google"
            onSuccess={this.handleGoogle}
            onFailure={this.handleFailure}
          />
        </div>
        <p> {this.state.googErr ? `Oops there was an error (${this.state.errMsg}), please try again` : ''} </p>
        <a href="/login"> Already a member? Login! </a>
      </div>
    );
  }
}

Signup.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
export default Signup;
