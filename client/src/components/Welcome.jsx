import React from 'react';
import Signup from './Signup';
import welcomeimage from './../WelcomeImage.png';

const Welcome = () => (
  <div className="container">
    <article style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <h1 style={{ 'font-size': '50px', color: 'white', 'text-shadow': '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' }}>
        Welcome to Q!
      </h1>
      <Signup style={{ width: 320, position: 'absolute', left: '50%' }} />
    </article>
    <div className="fullscreen-bg">
      <video autoPlay loop className="fullscreen-bg__video" poster={welcomeimage}>
        <source src="https://s3-us-west-1.amazonaws.com/q-assets/Shoes-Stories.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
);

export default Welcome;
