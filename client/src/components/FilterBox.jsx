import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class FilterBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Enter your city and state below:</p>
        <MuiThemeProvider>
          <AutoComplete
            hintText="City, ST"
            dataSource={this.props.locations}
            onUpdateInput={this.props.setLocation}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

module.exports = FilterBox;
