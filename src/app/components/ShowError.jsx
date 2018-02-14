import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configure from './store';

class ShowError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message : '',
    };
  }

  showErrorMessage(error) {
    this.setState({message:error.message});
  }

    render() {
        return(
          <div className="alert alert-danger">
            <strong>Warning !</strong> {this.state.message}.
          </div>
        );
    }
};

export default ShowError;
