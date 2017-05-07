import React from 'react';
import Signup from './Signup.jsx';

const Welcome = () => (
  <div style={{ width: '100%', height: '100%' }}>
    <Signup style={{ width: 320, position: 'absolute', left: '50%' }} />
    <video autoPlay loop src="https://s3-us-west-1.amazonaws.com/q-assets/Shoes-Stories.mp4" type="video/mp4" />
  </div>
);

export default Welcome;
