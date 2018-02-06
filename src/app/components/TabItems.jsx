import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configure from './store';

class TabItems extends Component {
    render() {
        return(
          <tbody>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td>Germany2</td>
            </tr>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td>Germany2</td>
            </tr>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td>Germany2</td>
            </tr>
          </tbody>
        );
    }
};

export default TabItems;
