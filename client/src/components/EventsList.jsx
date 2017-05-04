import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventsListItem from './EventsListItem';

class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      null: null,
    });
  }

  render() {
    if (this.props.currentLocation && this.props.sort) {
      return (
        <div>
          <p> Here are your local events: </p>
          {this.props.events.filter(event =>
            (`${event.city}, ${event.state}`) === this.props.currentLocation)
          .sort((a, b) => a.amount - b.amount)
          .map(event => (
            <EventsListItem key={event.id} style={{ width: '200px' }} data={event} />
          ))}
        </div>
      );
    } else if (this.props.sort) {
      return (
        <div>
          <p> Please search above to find events in your area: </p>
          {this.props.events.sort((a, b) => b.amount - a.amount)
          .map(event => (
            <EventsListItem key={event.id} style={{ width: '200px' }} data={event} />
          ))}
        </div>
      );
    } else if (this.props.currentLocation) {
      return (
        <div>
          <p> Here are your local events: </p>
          {this.props.events.filter(event =>
            (`${event.city}, ${event.state}`) === this.props.currentLocation)
          .map(event => (
            <EventsListItem key={event.id} style={{ width: '200px' }} data={event} />
          ))}
        </div>
      );
    }
    return (
      <div>
        <p> Please search above to find events in your area </p>
        {this.props.events.map(event => (
          <EventsListItem key={event.id} style={{ width: '200px' }} data={event} />
        ))}
      </div>
    );
  }
}

EventsList.propTypes = {
  currentLocation: PropTypes.string,
  sort: PropTypes.bool,
  events: PropTypes.node.isRequired,
};

EventsList.defaultProps = {
  currentLocation: null,
  sort: null,
};

export default EventsList;
