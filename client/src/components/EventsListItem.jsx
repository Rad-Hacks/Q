import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const EventsListItem = props => (
  <MuiThemeProvider>
    <Card>
      <CardHeader
        title={props.data.name}
        subtitle={props.data.address}
        actAsExpander
        showExpandableButton
      />
      <CardText expandable>
        Amount: {props.data.amount}
        Date: {props.data.date}
        Time: {props.data.time}
        Duration: {props.data.duration}
        Contact: {props.data.contactEmail}
      </CardText>
    </Card>
  </MuiThemeProvider>
);

EventsListItem.propTypes = {
  data: React.PropTypes.node.isRequired,
};

export default EventsListItem;
