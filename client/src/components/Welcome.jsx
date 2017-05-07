import React from 'react';
import Login from './Login.jsx';

const Welcome = () => (
  <div style={{ width: '100%', height: '100%' }}>
    <Login style={{ width: 320, position: 'absolute', left: '50%' }} />
    <video autoPlay loop src="https://s3-us-west-1.amazonaws.com/q-assets/Shoes-Stories.mp4" type="video/mp4" />
  </div>
);

export default Welcome;
