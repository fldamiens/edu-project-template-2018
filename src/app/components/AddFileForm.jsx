import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configure from './store';

class AddFileForm extends Component {
    render() {
        return(
          <form>
            <div className="form-group">
              <label>Example label</label>
              <input type="text" className="form-control" placeholder="Example input" />
            </div>
            <div className="form-group">
              <label >Another label</label>
              <input type="text" className="form-control"  placeholder="Another input" />
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
          </form>
        );
    }
};

export default AddFileForm;
