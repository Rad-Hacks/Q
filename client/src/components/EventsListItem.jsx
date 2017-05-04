import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const EventsListItem = props => (
  <MuiThemeProvider>
    <Card>
      <CardHeader
        title={props.data.name}
        titleStyle={{ fontSize: '16px' }}
        subtitle={'$' + props.data.amount}
        subtitleStyle={{ fontSize: '20px', color: 'green' }}
        actAsExpander
        showExpandableButton
      />
      <CardText expandable>
        Address: {props.data.address}<br />
        Date: {props.data.date.slice(0, 10)}<br />
        Time: {props.data.time}<br />
        Duration: {props.data.duration + ' hours'}<br />
        Contact: {props.data.contactEmail}<br />
      </CardText>
    </Card>
  </MuiThemeProvider>
);

EventsListItem.propTypes = {
  data: PropTypes.node.isRequired,
};

export default EventsListItem;
