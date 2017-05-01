import React, { Component } from 'react';
import EventsListItem from './EventsListItem.jsx';

class EventsList extends Component {
  constructor(props){
    super(props);
  }
  render() {
    if (this.props.currentLocation && this.props.sort) {
      return (
        <div>
          <p> Here are your local events: </p>
          {this.props.events.filter (event =>
            (event.city + ', ' + event.state) === this.props.currentLocation)
          .sort((a, b) => a.amount - b.amount)
          .map(event => (
               <EventsListItem style={{width: '200px'}}data={event}/>
          ))}
        </div>
      )
    } else if (this.props.sort) {
      return (
        <div>
          <p> Please search above to find events in your area: </p>
          {this.props.events.sort((a, b) => b.amount - a.amount)
          .map(event => (
               <EventsListItem style={{width: '200px'}}data={event}/>
          ))}
        </div>
      )
    } else if (this.props.currentLocation) {
      return (
        <div>
          <p> Here are your local events: </p>
          {this.props.events.filter (event =>
            (event.city + ', ' + event.state) === this.props.currentLocation)
          .map(event => (
               <EventsListItem style={{width: '200px'}}data={event}/>
          ))}
        </div>
      )
    } else {
      return (
        <div>
         <p> Please search above to find events in your area </p>
          {this.props.events.map(event => (
             <EventsListItem style={{width: '200px'}}data={event}/>
          ))}
        </div>
      );
    }
  }
}

module.exports = EventsList;
