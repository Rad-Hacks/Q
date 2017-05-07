import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import $ from 'jquery';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      googErr: false,
    };
    // Bindings
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoogle = this.handleGoogle.bind(this);
    this.handleFailure = this.handleFailure.bind(this);
  }
  handleGoogle(response) {
    console.log(response);
    // send username data
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8080/api/googleusers',
      data: { username: response.profileObj.email },
      success: (resp) => {
        console.log(resp);
      },
      error: (err) => {
        console.log(err);
        this.setState({
          googErr: true,
        });
      },
    });
  }
  handleFailure() {
    this.setState({
      googErr: true,
    });
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
      <div className="social-signin">
        <GoogleLogin
          clientId="1031010390104-f139vsdq3f8dn21usnuj4h3jtq8jpdpf.apps.googleusercontent.com"
          buttonText="Sign In with Google"
          onSuccess={props.handleGoogle}
          onFailure={props.handleFailure}
        />
      </div>
      <p> {!props.googErr ? 'Oops there was an error, please try again' : ''} </p>
      <a href="/signup"> Not a member? Signup! </a>
    );
  }
}

export default Login;
