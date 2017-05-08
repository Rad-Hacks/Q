import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Home from './components/Home';
import Welcome from './components/Welcome';
import './index.css';

injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      loggedIn: null,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentWillMount() {
    $.get('http://localhost:8080/api/insession')
    .then((resp) => {
      this.setState({
        loggedIn: resp,
      });
    });
  }
  handleLogin(loggedObj) {
    console.log(loggedObj);
    this.setState({
      userId: loggedObj.userId,
      loggedIn: loggedObj.loggedIn,
    });
  }
  handleLogout() {
    $.get('http://localhost:8080/api/logout')
    .then(() => {
      this.setState({
        userId: null,
        loggedIn: false,
      });
    });
  }

  render() {
    const page = this.state.loggedIn ?
      (<Home
        userId={this.state.userId}
        handleLogout={this.handleLogout}
      />)
    : (<Welcome
      path={this.props.match.url}
      userId={this.state.userId}
      handleLogin={this.handleLogin}
    />);
    return (
      <div>
        {page}
      </div>
    );
  }
}

App.propTypes = {
  match: PropTypes.node.isRequired,
};

export default App;
