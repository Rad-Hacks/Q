import React, { Component } from 'react';
import logo from './q-baller.png';
import './App.css';
import Nav from './components/Nav.jsx';
import EventsList from './components/EventsList.jsx';
import FilterBox from './components/FilterBox.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      locations: [],
      currentLocation: null
    }
  }

  componentDidMount () {
    fetch('http://localhost:8080/api/events')
      .then(res =>  res.json())
      .then(json => {this.setState ({
        events: json,
        locations: json.map(event => event.city + ', ' + event.state)
      })
    });
  }

  setLocation(loc) {
    this.setState({
      currentLocation: loc
    }, function () {
      console.log(this.state.currentLocation)
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Q</h2>
          <Nav />
        </div>
        <p className="App-intro">
          Sign-up, stand in line, make money.
        </p>
        <FilterBox locations={this.state.locations} setLocation={this.setLocation.bind(this)} />
        <EventsList events={this.state.events} currentLocation={this.state.currentLocation} />
      </div>
    );
  }
}

export default App;
