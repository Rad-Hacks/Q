import React from 'react';
import PropTypes from 'prop-types';
import Signup from './Signup';
import Login from './Login';
import welcomeimage from './../WelcomeImage.png';

const Welcome = (props) => {
  const auth = props.path === '/login' ?
  (<Login
    style={{ width: 320, right: '20%' }}
    userId={props.userId}
    handleLogin={props.handleLogin}
  />)
    : (<Signup
      style={{ width: 320, left: '20%' }}
      userId={props.userId}
      handleLogin={props.handleLogin}
    />);
  return (
    <div className="container">
      <article style={{ position: 'absolute', width: '100%', height: '100%', clear: 'both' }} >
        <h1 style={{ 'font-size': '50px', color: 'white', 'text-shadow': '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' }}>
          Welcome to Q!
        </h1>
        {auth}
      </article>
      <div className="fullscreen-bg">
        <video autoPlay loop className="fullscreen-bg__video" poster={welcomeimage}>
          <source src="https://s3-us-west-1.amazonaws.com/q-assets/Shoes-Stories.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

Welcome.propTypes = {
  path: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

Welcome.defaultProps = {
  userId: null,
};

export default Welcome;
