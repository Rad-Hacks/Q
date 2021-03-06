import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { purple500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import './FilterBox.css';


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
      // used for sorting DropDownMenu
      value: 1,
    });
    this.handleChange = this.handleChange.bind(this);
  }
  // handles change of sorting DropDownMenu
  handleChange(event, index, value) {
    this.setState({
      value,
    }, () => {
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
    // rendered if users clicks button to only show their created Qs
    if (this.props.filterUserQs) {
      return (
        <div style={{ 'text-align': 'center' }}>
          <MuiThemeProvider>
            <RaisedButton
              label="Click to return to all Q's"
              onClick={this.props.toggleFilterUserQs}
              labelStyle={{ color: 'purple' }}
            />
          </MuiThemeProvider>
        </div>
      );
    }
    return (
      <div className="FilterBox">
        <div className="search">
          <p className="searchtext">Search for Q&#39;s in your area here:</p>
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
        </div>
        {/* sorts by date or dollar amount*/}
        <div className="sort">
          <MuiThemeProvider>
            <DropDownMenu
              value={this.state.value}
              onChange={this.handleChange}
              underlineStyle={styles.underlineStyle}
            >
              <MenuItem value={1} primaryText="Sort Items" />
              <MenuItem value={2} primaryText="Sort By Date" />
              <MenuItem value={3} primaryText="Sort By Amount" />
            </DropDownMenu>
          </MuiThemeProvider>
        </div>
        {/* // filters users created Qs*/}
        <div className="filter">
          <MuiThemeProvider>
            <RaisedButton
              label="Click here to see your Q's"
              onClick={this.props.toggleFilterUserQs}
              labelStyle={{ color: 'purple' }}
            />
          </MuiThemeProvider>
        </div>
        <br /><br />
      </div>
    );
  }
}

FilterBox.propTypes = {
  locations: PropTypes.node,
  setLocation: PropTypes.func.isRequired,
  toggleSortByDate: PropTypes.func.isRequired,
  toggleSortByAmount: PropTypes.func.isRequired,
  toggleFilterUserQs: PropTypes.func.isRequired,
  turnOffSorts: PropTypes.func.isRequired,
  filterUserQs: PropTypes.bool,
};

FilterBox.defaultProps = {
  locations: null,
  filterUserQs: null,
};

module.exports = FilterBox;
