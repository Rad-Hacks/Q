import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { purple500 } from 'material-ui/styles/colors';

const styles = {
  labelStyle: {
    color: purple500,
  },
  underlineStyle: {
    borderColor: purple500,
  },
  backgroundColor: {
    color: purple500,
  },
};

class FilterBox extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      value: 1,
    });
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({
      value,
    }, function () {
      if (this.state.value === 2) {
        this.props.toggleSortByDate();
      } else if (this.state.value === 3) {
        this.props.toggleSortByAmount();
      } else if (this.state.value === 1) {
        this.props.turnOffSorts();
      }
    });
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
            underlineStyle={styles.underlineStyle}
            filter={AutoComplete.caseInsensitiveFilter}
            maxSearchResults={10}
          />
        </MuiThemeProvider>
        <br />
        <MuiThemeProvider>
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="Sort Items" />
            <MenuItem value={2} primaryText="Sort By Date" />
            <MenuItem value={3} primaryText="Sort By Amount" />
          </DropDownMenu>
        </MuiThemeProvider>
        <br />
        <br />
      </div>
    );
  }
}

FilterBox.propTypes = {
  locations: PropTypes.node,
  setLocation: PropTypes.func.isRequired,
  toggleSortByDate: PropTypes.func.isRequired,
  toggleSortByAmount: PropTypes.func.isRequired,
  turnOffSorts: PropTypes.func.isRequired,
};

module.exports = FilterBox;
