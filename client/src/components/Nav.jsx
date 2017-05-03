import React from 'react';
import PropTypes from 'prop-types';
import EventForm from './EventForm';

const Nav = props => (
  <div>
    <EventForm
      handleCreateQ={props.handleCreateQ}
      userId={props.userId}
    />
  </div>
);

Nav.propTypes = {
  handleCreateQ: PropTypes.func.isRequired,
  userId: PropTypes.func.isRequired,
};


export default Nav;
