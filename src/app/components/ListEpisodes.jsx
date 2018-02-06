import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configure from './store';
import TabHeader from './TabHeader'
import TabItems from './TabItems'

class ListEpisodes extends Component {
    render() {
        return(
          <div>
            <table className="table table-striped">
              <TabHeader />
              <TabItems />
            </table>
          </div>
        );
    }
};

export default ListEpisodes;
