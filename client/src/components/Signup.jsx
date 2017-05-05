import React, { Component } from 'react';

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
    };
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
    );
  }
}

export default Signup;
