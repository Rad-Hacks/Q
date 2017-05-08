import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import $ from 'jquery';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginErr: false,
      errMsg: null,
    };
    // Bindings
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoogle = this.handleGoogle.bind(this);
    this.handleFailure = this.handleFailure.bind(this);
  }
  handleGoogle(response) {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8080/api/googleusers',
      params: { username: response.profileObj.email },
    })
    .then((resp) => {
      this.props.handleLogin(resp);
    })
    .catch((err) => {
      console.log('Error: ', err);
      this.setState({
        loginErr: true,
        errMsg: err,
      });
    });
  }
  handleFailure() {
    this.setState({
      loginErr: true,
      errMsg: 'unable to login with google',
    });
  }

  handleSubmit() {
    const userObj = {
      username: this.state.username,
      password: this.state.password,
    };
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/api/usersLogin',
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
          <button onClick={this.handleSubmit}>
            <i className="spinner" />
            <span className="state">Log in</span>
          </button>
        </form>
        <br />
        <br />
        <div>
          <GoogleLogin
            clientId="1031010390104-f139vsdq3f8dn21usnuj4h3jtq8jpdpf.apps.googleusercontent.com"
            buttonText="Sign In with Google"
            onSuccess={this.handleGoogle}
            onFailure={this.handleFailure}
          />
        </div>
        <p> {this.state.loginErr ? `Oops there was an error(${this.state.errMsg}), please try again` : ''} </p>
        <a href="/signup"> Not a member? Signup! </a>
      </div>
    );
  }
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
