import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configure from './store';

class Footer extends Component {
    render() {
        return(
          <footer className="footer">
            <div style={{textAlign: 'center'}} className="container">
                <span className="text-muted">© 2018 Copyright BlockBuster: Mariot Guillaume - Damiens Florent</span>
            </div>
        </footer>
        );
    }
};

export default Footer;
