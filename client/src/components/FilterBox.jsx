import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const FilterBox = props => (
  <div>
    <p>Enter your city and state below:</p>
    <MuiThemeProvider>
      <AutoComplete
        hintText="City, ST"
        dataSource={props.locations}
        onUpdateInput={props.setLocation}
      />
    </MuiThemeProvider>
    <br />
    <MuiThemeProvider>
      <RaisedButton label="Sort $$$ ---> $" primary onClick={props.toggleSort} />
    </MuiThemeProvider>
    <br />
    <br />
  </div>
);

FilterBox.propTypes = {
  locations: React.PropTypes.node.isRequired,
  setLocation: React.PropTypes.node.isRequired,
  toggleSort: React.PropTypes.node.isRequired,
};

module.exports = FilterBox;
