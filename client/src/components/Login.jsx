import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import $ from 'jquery';
import './Login.css';

const GOOGLE_API = require('../config/google.js');

const GOOGLE_CLIENT_ID = GOOGLE_API.apiAuth;
let progressBar = null;

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
    progressBar = <CircularProgress size={60} thickness={7} />;
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8080/api/googleusers',
      data: {
        username: response.profileObj.email,
      },
    })
    .then((resp) => {
      progressBar = null;
      this.props.handleLogin(resp);
    })
    .catch((err) => {
      progressBar = null;
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
    progressBar = <CircularProgress size={60} thickness={7} />;
    const userObj = {
      username: this.state.username,
      password: this.state.password,
    };
    console.log('login success');
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/api/usersLogin',
      data: userObj,
      success: (resp) => {
        progressBar = null;
        this.props.handleLogin(resp);
      },
      error: (error) => {
        progressBar = null;
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
          <button onClick={(e) => {e.preventDefault(); return this.handleSubmit(e); }} >
            <i className="spinner" />
            <span className="state">Log in</span>
          </button>
          <MuiThemeProvider>
            {progressBar}
          </MuiThemeProvider>
        </form>
        <br />
        <br />
        <div>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
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
