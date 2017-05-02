import React from 'react';
import PropTypes from 'prop-types';
import EventForm from './EventForm';

const Nav = props => (
  <div>
    <EventForm handleCreateQ={props.handleCreateQ} />
  </div>
);

Nav.propTypes = {
  handleCreateQ: PropTypes.func.isRequired,
};


export default Nav;
