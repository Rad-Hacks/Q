import React, { Component } from 'react';
import EventsListItem from './EventsListItem.jsx';

class EventsList extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
       <p> This is EventsList</p>
        {this.props.events.map(event => (
           <EventsListItem style={{width: '200px'}}data={event}/>
        ))}
      </div>
    );
  }

}

module.exports = EventsList;
