import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configure from './store';

class BoxInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message : '',
      type: ''
    };

    this.showMessage = this.showMessage.bind(this);
  }

  showMessage(info) {
    this.setState({message:info.message});
    this.setState({type:info.type});
  }

  render() {
      if(this.state.message != ''){
        return(
            <div id="infoContainer" className={this.state.type == 'error' ? "alert alert-danger" : "alert alert-primary"}>
              <strong>{this.state.type == 'error' ? "Warning !" : "Information !"}</strong> {this.state.message}.
            </div>
        );
      }else{
        return(
          <div id="infoContainer"></div>
        );
      }
  }
};

export default BoxInfo;
