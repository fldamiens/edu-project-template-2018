import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configure from './store';

class TabHeader extends Component {
    render() {
        return(
          <thead className="thead-default">
            <tr>
              <th>Id</th>
              <th>Serie</th>
              <th>Season</th>
              <th>Episode</th>
            </tr>
          </thead>
        );
    }
};

export default TabHeader;
