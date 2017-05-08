import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import EventForm from './EventForm';

const Nav = props => (
  <MuiThemeProvider>
    <div>
      <EventForm
        handleCreateQ={props.handleCreateQ}
        userId={props.userId}
        style={{ float: 'right' }}
      />
      <RaisedButton
        label="Logout"
        primary
        onTouchTap={props.handleLogout}
        style={{ float: 'right' }}
      />,
    </div>
  </MuiThemeProvider>
);

Nav.propTypes = {
  handleCreateQ: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

Nav.defaultProps = {
  userId: null,
};


export default Nav;
