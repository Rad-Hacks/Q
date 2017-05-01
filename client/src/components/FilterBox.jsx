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
        <MuiThemeProvider>
          <AutoComplete
            hintText="City, ST"
            dataSource={this.props.locations}
            onUpdateInput={this.handleUpdateInput}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

module.exports = FilterBox;
