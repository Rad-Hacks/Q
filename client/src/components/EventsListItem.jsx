import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const EventsListItem = (props) => (
  <MuiThemeProvider>
    <Card>
      <p>{console.log('props', props)}</p>
      <CardHeader
        title={props.data.name}
        subtitle={props.data.address}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        Amount: {props.data.amount}
        Date: {props.data.date}
        Time: {props.data.time}
        Duration: {props.data.duration}
        Contact: {props.data.contactEmail}
      </CardText>
    </Card>
    </MuiThemeProvider>
);

export default EventsListItem;
