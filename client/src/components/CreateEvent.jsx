import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import EventForm from './EventForm';

class CreateEvent extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        disabled
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <MuiThemeProvider>
        <div style={{ float: 'right' }}>
          <RaisedButton label="+" onTouchTap={this.handleOpen} />
          <Dialog
            title="Create a Q"
            actions={actions}
            modal
            open={this.state.open}
          >
            <EventForm />
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default CreateEvent;
