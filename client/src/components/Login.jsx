import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
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
    fetch('http://localhost:8080/api/googleusers', {
      method: 'GET',
      params: {
        username: response.profileObj.email,
      },
    })
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      this.setState({
        loginErr: true,
        errMsg: err,
      });
    });
  }
  handleFailure(e) {
    this.setState({
      loginErr: true,
      errMsg: 'unable to login with google'
    });
  }

  handleSubmit() {
    fetch('http://localhost:8080/api/usersLogin', {
      method: 'post',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        login: true,
      }),
    })
    .then((resp) => {
      // respt = user_id send to App
    })
    .catch((err) => {
      console.log(err);
      this.setState({
        loginErr: true,
        errMsg: err,
      });
    });
  }
  render() {
    return (
      <div>
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
        <GoogleLogin
          clientId="1031010390104-f139vsdq3f8dn21usnuj4h3jtq8jpdpf.apps.googleusercontent.com"
          buttonText="Sign In with Google"
          onSuccess={this.handleGoogle}
          onFailure={this.handleFailure}
        />
        <p> {this.state.loginErr ? `Oops there was an error(${this.state.errMsg}), please try again` : ''} </p>
        <a href="/signup"> Not a member? Signup! </a>
      </div>
    );
  }
}

export default Login;
