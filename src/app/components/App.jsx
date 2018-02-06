import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configure from './store';
import ListEpisodes from './ListEpisodes'
import AddFileForm from './AddFileForm'
import Header from './Header'
import Footer from './Footer'

import 'bootstrap/dist/css/bootstrap.min.css';

const store = configure();

class MainApp extends Component {
    render() {
        return(
          <div className="container">
            <div className="row">
              <div className="col">
                <ListEpisodes />
              </div>
              <div className="col col-lg-2">
                  <AddFileForm />
              </div>
            </div>
          </div>
        );
    }
};

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                  <div>
                    <Header />
                    <Route path="/" component={MainApp}>
                    </Route>
                  </div>
                </Router>
            </Provider>
        );
    }
};
