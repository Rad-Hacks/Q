import React, { Component } from 'react';
import $ from 'jquery';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import { purple500, blue500 } from 'material-ui/styles/colors';

const styles = {
  errorStyle: {
    color: purple500,
  },
  underlineStyle: {
    borderColor: purple500,
  },
  floatingLabelStyle: {
    color: purple500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};

const parsedDate = (dateStr) => {
  const month = dateStr.slice(4, 7);
  const months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };
  return `${dateStr.slice(11, 15)}-${months[month]}-${dateStr.slice(8, 10)}`;
};

const parseTime = (dateStr) => {
  const time = dateStr.slice(16, 24);
  return time;
};

// TIME: Mon May 01 2017 14:25:07 GMT-0500 (CDT)

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: null,
      amount: null,
      address: null,
      city: null,
      state: null,
      date: null,
      time: null,
      contactEmail: null,
      duration: null,
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleChangeDatePicker = this.handleChangeDatePicker.bind(this);
    this.handleChangeTimePicker = this.handleChangeTimePicker.bind(this);
    this.handleChangeDuration = this.handleChangeDuration.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }
  handleClose() {
    const eventObj = {
      name: this.state.name,
      amount: this.state.amount,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      date: parsedDate(this.state.date.toString()),
      time: parseTime(this.state.time.toString()),
      duration: this.state.duration,
      contactEmail: this.state.contactEmail,
    };
    console.log(eventObj);
    const self = this;
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:8080/api/events',
      data: eventObj,
      success: () => {
        self.props.handleCreateQ();
        self.setState({
          open: false,
        });
      },
      error: (err) => {
        self.setState({
          createQMsg: `Error: ${err}, please try again`,
        });
      },
    });
  }

  handleChangeName(e, value) {
    this.setState({
      name: value,
    });
  }
  handleChangeAmount(e, value) {
    this.setState({
      amount: value,
    });
  }
  handleChangeAddress(e, value) {
    this.setState({
      address: value,
    });
  }
  handleChangeCity(e, value) {
    this.setState({
      city: value,
    });
  }
  handleChangeState(e, value) {
    this.setState({
      state: value,
    });
  }
  handleChangeDatePicker(event, date) {
    this.setState({
      date,
    });
  }
  handleChangeTimePicker(event, date) {
    this.setState({
      time: date,
    });
  }
  handleChangeDuration(event, value) {
    this.setState({
      duration: value,
    });
  }
  handleChangeEmail(e, value) {
    this.setState({
      contactEmail: value,
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
            autoScrollBodyContent
          >
            <div>
              <TextField
                floatingLabelText="Event Name"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                errorText="This field is required."
                errorStyle={styles.errorStyle}
                onChange={this.handleChangeName}
              /><br />
              <TextField
                floatingLabelText="Amount"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                errorText="This field is required."
                errorStyle={styles.errorStyle}
                onChange={this.handleChangeAmount}
              /><br />
              <TextField
                floatingLabelText="Address"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                onChange={this.handleChangeAddress}
              /><br />
              <TextField
                floatingLabelText="City"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                onChange={this.handleChangeCity}
              /><br />
              <TextField
                floatingLabelText="State (example: TX for Texas)"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                onChange={this.handleChangeState}
              /><br />
              <DatePicker
                hintText="Select Date"
                value={this.state.date}
                onChange={this.handleChangeDatePicker}
              /><br />
              <TimePicker
                format="24hr"
                hintText="Time in 24hr format"
                value={this.state.time}
                onChange={this.handleChangeTimePicker}
              /><br />
              <TextField
                floatingLabelText="Duration in Hours"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                onChange={this.handleChangeDuration}
              /><br />
              <TextField
                floatingLabelText="Contact Email"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                onChange={this.handleChangeEmail}
              />
            </div>
            <p> {this.state.createQMsg} </p>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default EventForm;
