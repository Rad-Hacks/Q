import React, { Component } from 'react';
import $ from 'jquery';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import CircularProgress from 'material-ui/CircularProgress';
import { purple500, blue500 } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';

const GOOGLE_API = require('../config/google.js');

const GOOGLE_API_KEY = GOOGLE_API.apiSearch;

// styling for input fields in create Q forms
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

// parse date from database in YYYY-MM-DD
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

// show date in HH:MM:SS
const parseTime = (dateStr) => {
  const time = dateStr.slice(16, 24);
  return time;
};

let progressBar = null;

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
      image: null,
      possibleLocations: [],
      possibleIds: [],
      placeId: null,
      placeLat: null,
      placeLng: null,
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.getEstablishmentInfo = this.getEstablishmentInfo.bind(this);
  }

  getCoordinates() {
    $.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.city},+${this.state.state}'&key=${GOOGLE_API_KEY}`)
    .then((res) => {
      this.setState({
        placeLat: res.results[0].geometry.location.lat,
        placeLng: res.results[0].geometry.location.lng,
      });
    });
  }

  getAutoCompletePredictions() {
    $.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${this.state.name}&types=establishment&location=${this.state.placeLat},${this.state.placeLng}&radius=500&key=${GOOGLE_API_KEY}`)
    .then((res) => {
      this.setState({
        possibleLocations: res.predictions.map(place => place.description),
        possibleIds: res.predictions.map(place => place.place_id),
      });
    });
  }

  getEstablishmentInfo() {
    const id = this.state.possibleIds[0];
    $.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${GOOGLE_API_KEY}`)
    .then((res) => {
      this.setState({
        name: res.result.name,
        address: res.result.formatted_address.split(',')[0],
        city: res.result.formatted_address.split(',')[1].replace(/\s/g, ''),
        state: res.result.formatted_address.split(',')[2].substring(1, 3),
        image: res.result.photos[0].photo_reference,
      });
    });
  }

  // Open and Close handles pop-up dialog display (create q's)
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
  handleSubmit() {
    const self = this;
    progressBar = <CircularProgress size={60} thickness={7} />;
    const eventObj = {
      user_id: this.props.userId,
      name: this.state.name,
      amount: this.state.amount,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      date: parsedDate(this.state.date.toString()),
      time: parseTime(this.state.time.toString()),
      duration: this.state.duration,
      contactEmail: this.state.contactEmail,
      image: this.state.image,
    };
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:8080/api/events',
      data: eventObj,
      success: () => {
        progressBar = null;
        self.setState({
          open: false,
        });
        self.props.handleCreateQ();
      },
      error: (err) => {
        progressBar = null;
        self.setState({
          createQMsg: `Error: ${err}, please try again`,
        });
      },
    });
  }

  handleChangeName(value) {
    this.setState({
      name: value,
    }, this.getAutoCompletePredictions);
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
    }, this.getCoordinates());
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
        onTouchTap={this.handleSubmit}
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
                floatingLabelText="City"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                onChange={this.handleChangeCity}
                value={this.state.city}
              /><br />
              <TextField
                floatingLabelText="State (example: TX for Texas)"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                onChange={this.handleChangeState}
                value={this.state.state}
              /><br />
              <AutoComplete
                fullWidth
                floatingLabelText="Establishment Name"
                filter={AutoComplete.caseInsensitiveFilter}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                errorText="This field is required."
                errorStyle={styles.errorStyle}
                dataSource={this.state.possibleLocations}
                onUpdateInput={this.handleChangeName}
                onNewRequest={this.getEstablishmentInfo}
                value={this.state.name}
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
                value={this.state.address}
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
            {progressBar}
            <p> {this.state.createQMsg} </p>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

EventForm.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default EventForm;
