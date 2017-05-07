import React, { Component } from 'react';
import $ from 'jquery';

class Login extends Component {
  componentDidMount() {
    let working = false;
    $('.login').on('submit', function(e) {
      e.preventDefault();
      if (working) return;
      working = true;
      var $this = $(this),
        $state = $this.find('button > .state');
      $this.addClass('loading');
      $state.html('Authenticating');
      setTimeout(function() {
        $this.addClass('ok');
        $state.html('Welcome back!');
        setTimeout(function() {
          $state.html('Log in');
          $this.removeClass('ok loading');
          working = false;
        }, 4000);
      }, 3000);
    });
  }
  render() {
    return (
      <form className="login">
        <p className="title">Log in</p>
        <input type="text" placeholder="Username" autoFocus />
        <i className="fa fa-user" />
        <input type="password" placeholder="Password" />
        <i className="fa fa-key" />
        <button>
          <i className="spinner" />
          <span className="state">Log in</span>
        </button>
      </form>
    );
  }

}

export default Login;
