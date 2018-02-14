import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configure from './store';
import ListEpisodes from './ListEpisodes';
import AddFileForm from './AddFileForm';
import Header from './Header';
import ShowError from './ShowError';

import 'bootstrap/dist/css/bootstrap.min.css';

const store = configure();

class MainApp extends Component {

    render() {
      const episodeAdded = (episode) => {
          this.listCpt.addEpisode(episode);
      };

      const showErrorMsg = (error) => {
          this.errComponent.showErrorMessage(error.message);
      };

        return(
          <div className="container">
            <ShowError ref={errorCpt => { this.errComponent = errorCpt; }}/>
            <div className="row">
              <div className="col">
                <ListEpisodes ref={list => { this.listCpt = list; }}/>
              </div>
              <div className="col col-lg-2">
                  <AddFileForm errorOccured={showErrorMsg}  addEpisode={episodeAdded}/>
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
