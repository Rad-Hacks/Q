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
    if (this.props.filterUserQs) {
      return (
        <div>
          <p> Here are your Qs: </p>
          {this.props.events.filter(event =>
            (event.user_id === this.props.userId))
          .map(event => (
            <EventsListItem key={event.id} style={{ width: '200px' }} data={event} />
          ))}
        </div>
      );
    } else if (this.props.currentLocation && this.props.sortByAmount) {
      return (
        <div>
          <p> Here are your local events: </p>
          {this.props.events.filter(event =>
            (`${event.city}, ${event.state}`) === this.props.currentLocation)
          .sort((a, b) => b.amount - a.amount)
          .map(event => (
            <EventsListItem key={event.id} style={{ width: '200px' }} data={event} />
          ))}
        </div>
      );
    } else if (this.props.currentLocation && this.props.sortByDate) {
      return (
        <div>
          <p> Here are your local events: </p>
          {this.props.events.filter(event =>
            (`${event.city}, ${event.state}`) === this.props.currentLocation)
          .sort((a, b) => parseInt(a.date.replace(/-/g, ''), 10) - parseInt(b.date.replace(/-/g, ''), 10))
          .map(event => (
            <EventsListItem key={event.id} style={{ width: '200px' }} data={event} />
          ))}
        </div>
      );
    } else if (this.props.sortByAmount) {
      const eventQs = this.props.events.slice();
      return (
        <div>
          <p> Please search above to find events in your area: </p>
          {eventQs.sort((a, b) => b.amount - a.amount)
          .map(event => (
            <EventsListItem key={event.id} style={{ width: '200px' }} data={event} />
          ))}
        </div>
      );
    } else if (this.props.sortByDate) {
      const eventQs = this.props.events.slice();
      return (
        <div>
          <p> Please search above to find events in your area: </p>
          {eventQs.sort((a, b) => parseInt(a.date.replace(/-/g, ''), 10) - parseInt(b.date.replace(/-/g, ''), 10))
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
  sortByDate: PropTypes.bool,
  sortByAmount: PropTypes.bool,
  events: PropTypes.node.isRequired,
  filterUserQs: PropTypes.bool,
  userId: PropTypes.string,
};

EventsList.defaultProps = {
  currentLocation: null,
  sortByDate: null,
  sortByAmount: null,
  filterUserQs: null,
  userId: null,
};

export default EventsList;
