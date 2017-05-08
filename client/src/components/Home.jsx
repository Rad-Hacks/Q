import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Home.css';
import Nav from './Nav';
import EventsList from './EventsList';
import FilterBox from './FilterBox';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      locations: [],
      currentLocation: null,
      sortByAmount: false,
      sortByDate: false,
      filterUserQs: false,
    };
    this.getQsFromDB = this.getQsFromDB.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.toggleSortByDate = this.toggleSortByDate.bind(this);
    this.toggleSortByAmount = this.toggleSortByAmount.bind(this);
    this.turnOffSorts = this.turnOffSorts.bind(this);
    this.handleCreateQ = this.handleCreateQ.bind(this);
    this.toggleFilterUserQs = this.toggleFilterUserQs.bind(this);
  }

  componentDidMount() {
    this.getQsFromDB();
  }
// retrieves all events in database once component mounts
  getQsFromDB() {
    fetch('http://localhost:8080/api/events')
      .then(res => res.json())
      .then((json) => {
        this.setState({
          events: json,
          locations: json.map(event => `${event.city}, ${event.state}`).filter((elem, index, self) =>
            index === self.indexOf(elem)),
        });
      });
  }
// sets current location, used in FilterBox to filter local events
  setLocation(loc) {
    this.setState({
      currentLocation: loc,
    });
  }
// toggles states, controlled by events in FilterBox
  toggleSortByDate() {
    this.setState({
      sortByDate: !this.state.sortByDate,
    });
  }

  toggleSortByAmount() {
    this.setState({
      sortByAmount: !this.state.sortByAmount,
    });
  }

  toggleFilterUserQs() {
    this.setState({
      filterUserQs: !this.state.filterUserQs,
    });
  }

  turnOffSorts() {
    this.setState({
      sortByAmount: false,
      sortByDate: false,
    });
  }
// refreshes listed events after new Q is submitted
  handleCreateQ() {
    this.getQsFromDB();
  }

  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <Nav
            handleCreateQ={this.handleCreateQ}
            userId={this.props.userId}
            handleLogout={this.props.handleLogout}
          />
          <h2 className="Title">Welcome to Q</h2>
        </div>
        <p className="Home-intro">
          Sign-up, stand in line, make money.
        </p>
        <FilterBox
          locations={this.state.locations}
          setLocation={this.setLocation}
          toggleSortByDate={this.toggleSortByDate}
          toggleSortByAmount={this.toggleSortByAmount}
          turnOffSorts={this.turnOffSorts}
          toggleFilterUserQs={this.toggleFilterUserQs}
          filterUserQs={this.state.filterUserQs}
        />
        <EventsList
          style={{ margin: '0 auto' }}
          events={this.state.events}
          currentLocation={this.state.currentLocation}
          sortByDate={this.state.sortByDate}
          sortByAmount={this.state.sortByAmount}
          filterUserQs={this.state.filterUserQs}
          userId={this.props.userId}
        />
      </div>
    );
  }
}

Home.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

Home.defaultProps = {
  userId: null,
};

export default Home;
