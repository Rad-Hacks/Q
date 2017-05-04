import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import logo from './q-baller.png';
import './App.css';
import Nav from './components/Nav';
import EventsList from './components/EventsList';
import FilterBox from './components/FilterBox';

injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      locations: [],
      currentLocation: null,
      sort: false,
      loggedIn: null,
    };
    this.getQsFromDB = this.getQsFromDB.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
    this.handleCreateQ = this.handleCreateQ.bind(this);
  }

  componentDidMount() {
    this.getQsFromDB();
  }

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
  setLocation(loc) {
    this.setState({
      currentLocation: loc,
    });
  }

  toggleSort() {
    this.setState({
      sort: !this.state.sort,
    });
  }

  handleCreateQ() {
    this.getQsFromDB();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Nav
            handleCreateQ={this.handleCreateQ}
            userId={this.state.loggedIn}
          />
          <h2>Welcome to Q</h2>
        </div>
        <p className="App-intro">
          Sign-up, stand in line, make money.
          <br />
          <br />
        </p>
        <FilterBox
          locations={this.state.locations}
          setLocation={this.setLocation}
          toggleSort={this.toggleSort}
        />
        <EventsList 
          style={{width:250, margin: '0 auto'}}
          events={this.state.events}
          currentLocation={this.state.currentLocation}
          sort={this.state.sort}
        />
      </div>
    );
  }
}

export default App;
