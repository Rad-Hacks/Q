import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import CustomRaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { purple500 } from 'material-ui/styles/colors';

const styles = {
  labelStyle: {
    color: purple500,
  },
  underlineStyle: {
    borderColor: purple500,
  },
};

const FilterBox = props => (
  <div>
    <p>Enter your city and state below:</p>
    <MuiThemeProvider>
      <AutoComplete
        hintText="City, ST"
        dataSource={props.locations}
        onUpdateInput={props.setLocation}
        underlineStyle={styles.underlineStyle}
      />
    </MuiThemeProvider>
    <br />
    <MuiThemeProvider>
      <CustomRaisedButton
        label="Sort $$$ ---> $"
        onClick={props.toggleSort}
        labelStyle={styles.labelStyle}
      />
    </MuiThemeProvider>
    <br />
    <br />
  </div>
);

FilterBox.propTypes = {
  locations: PropTypes.node.isRequired,
  setLocation: PropTypes.node.isRequired,
  toggleSort: PropTypes.node.isRequired,
};

module.exports = FilterBox;
