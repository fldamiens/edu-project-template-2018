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
import BoxInfo from './BoxInfo';
import Footer from './Footer';
import EditPage from './EditPage';
import './../style/Style.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const store = configure();

class MainPage extends Component {

    render() {
      const episodeAdded = (episode) => {
          this.listCpt.addEpisode(episode);
      };

      const showMsg = (info) => {
          this.info.showMessage(
            {
              message:info.message.message,
              type: info.result
            }
          );
      };

        return(
          <div className="container">
            <h1 style={{marginBottom: '30px'}} className="text-center">Welcome to BlockBuster !</h1>
            <BoxInfo ref={errorCpt => { this.info = errorCpt; }}/>
            <div className="row">
              <div className="col">
                <ListEpisodes ref={list => { this.listCpt = list; }}/>
              </div>
              <div className="col col-lg-2">
                  <AddFileForm infoOccured={showMsg}  addEpisode={episodeAdded}/>
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
                    <Route exact path="/" component={MainPage}/>
                    <Route path="/:id" component={EditPage}/>
                    <Footer />
                  </div>
                </Router>
            </Provider>
        );
    }
};
