import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import PropTypes from 'prop-types';
import Home from './components/Home';
import Welcome from './components/Welcome';
import './index.css';

injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogin(userID) {
    this.setState({
      userId: userID,
    });
  }
  handleLogout() {
    this.setState({
      userId: null,
    });
  }
  render() {
    const page = this.state.userId !== null ?
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
