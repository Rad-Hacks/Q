import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import $ from 'jquery';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      city: '',
      state: '',
      phone: '',
      email: '',
      googErr: false,
    };
    // Bindings
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoogle = this.handleGoogle.bind(this);
    this.handleFailure = this.handleFailure.bind(this);
  }

  handleGoogle(response) {
    console.log(response);
    const userObj = {
      username: response.profileObj.email,
      password: response.googleId,
      city: '',
      state: '',
      contactEmail: response.profileObj.email,
    }
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/api/googleusers',
      data: userObj,
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
    fetch('http:localhost:8080/api/users', {
      method: 'post',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        city: this.state.city,
        state: this.state.state,
        phone: this.state.phone,
        email: this.state.email,
      }),
    });
  }
  render() {
    return (
      <form className="login">
        <p className="title">Sign up</p>
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
        <input
          type="text" placeholder="City"
          onChange={(e) => { this.setState({ city: e.target.value }); }}
        />
        <i className="fa fa-location-arrow" />
        <input
          type="text" placeholder="State"
          onChange={(e) => { this.setState({ state: e.target.value }); }}
        />
        <i className="fa fa-location-arrow" />
        <input
          type="text" placeholder="Phone"
          onChange={(e) => { this.setState({ phone: e.target.value }); }}
        />
        <i className="fa fa-phone" />
        <input
          type="text" placeholder="Email"
          onChange={(e) => { this.setState({ email: e.target.value }); }}
        />
        <i className="fa fa-envelope" />
        <button onClick={() => this.handleSubmit}>
          <i className="spinner" />
          <span className="state">Log in</span>
        </button>
      </form>
      <div className="social-signin">
        <GoogleLogin
          clientId="1031010390104-f139vsdq3f8dn21usnuj4h3jtq8jpdpf.apps.googleusercontent.com"
          buttonText="Sign Up with Google"
          onSuccess={props.handleGoogle}
          onFailure={props.handleFailure}
        />
      </div>
      <p> {!props.googErr ? 'Oops there was an error, please try again' : ''} </p>
      <a href="/login"> Already a member? Login! </a>
    );
  }
}
export default Signup;
