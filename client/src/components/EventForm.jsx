import React, { Component } from 'react';
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

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      amount: null,
      address: null,
      city: null,
      state: null,
      date: null,
      time: null,
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDatePicker = this.handleChangeDatePicker.bind(this);
    this.handleChangeTimePicker = this.handleChangeTimePicker.bind(this);
  }
  handleChangeName(value) {
    this.setState({
      name: value,
    });
  }
  handleChangeAmount(value) {
    this.setState({
      amount: value,
    });
  }
  handleChangeAddress(value) {
    this.setState({
      address: value,
    });
  }
  handleChangeCity(value) {
    this.setState({
      city: value,
    });
  }
  handleChangeState(value) {
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
  render() {
    return (
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
          hintText="Controlled Date Input"
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
          floatingLabelText="Contact Email"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          onChange={this.handleChangeEmail}
        />
      </div>
    );
  }
}

export default EventForm;
