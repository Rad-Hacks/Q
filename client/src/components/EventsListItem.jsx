import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const GOOGLE_API_KEY = require('../config/google.js');

class EventsListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
    };
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card>
          <CardHeader
            title={this.props.data.name}
            titleStyle={{ fontSize: '16px' }}
            subtitle={`$${this.props.data.amount}`}
            subtitleStyle={{ fontSize: '20px', color: 'green' }}
            actAsExpander
            showExpandableButton
          />
          <div><img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.props.data.image}&key=${GOOGLE_API_KEY}`} width={'300'} height={'200'} /></div>
          <CardText expandable>
            Address: {this.props.data.address}<br />
            Date: {this.props.data.date.slice(0, 10)}<br />
            Time: {this.props.data.time}<br />
            Duration: {`${this.props.data.duration} hours`}<br />
            Contact: {this.props.data.contactEmail}<br />
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

EventsListItem.propTypes = {
  data: PropTypes.node.isRequired,
};

export default EventsListItem;
