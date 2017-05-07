import React from 'react';

const Welcome = () => (
  <div class="homepage-hero-module">
    <div class="video-container">
        <div class="filter" />
        <video autoPlay loop class="fillWidth">
            <source src="https://s3-us-west-1.amazonaws.com/q-assets/Shoes-Stories.mp4" type="video/mp4" />
        </video>
    </div>
</div>
);

export default Welcome;
