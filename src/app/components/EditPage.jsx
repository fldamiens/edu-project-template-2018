import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configure from './store';
import TabHeader from './TabHeader';
import TabItems from './TabItems';
import BoxInfo from './BoxInfo';

class EditPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id : this.props.match.params.id+'',
      name : '',
      code : '',
      score : '',
      episodeBase : {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount(){
    fetch('/api/episodes/'+this.props.match.params.id, {
      method: 'GET',
    }).then(result => {
      return result.json();
    }).then(data => {
      if(data.result != 'error'){
        this.setState({name: data.data.name});
        this.setState({code: data.data.code});
        this.setState({score: data.data.score});
        this.setState({episodeBase: data.data});
      }else{
        this.info.showMessage(
          {
            message: data.message,
            type: data.result
          }
        );
      }
    })
  }

  handleSubmit(event){
    event.preventDefault();
    fetch('/api/episodes', {
      method: 'PUT',
      body: JSON.stringify(this.state),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => {
      return response.json()
    }).then((res) => {
        console.log(res);
        if(res.result == 'success'){
          this.props.history.push('/');
        }else{
          this.info.showMessage(
            {
              message: res.message.message,
              type: res.result
            }
          );
          let episodeBase = this.state.episodeBase;
          this.setState({name: episodeBase.name});
          this.setState({code: episodeBase.code});
          this.setState({score: episodeBase.score});
        }
    })
  }

  handleInputChange(event){
    let target = event.target;
    let name = target.name;
    let value = target.value;

    this.setState({
      [name] : value
    })
  }


    render() {
      return(
        <div className="container">
          <h1 style={{marginBottom: '30px'}} className="text-center">Update an episode !</h1>
          <BoxInfo ref={info => { this.info = info; }}/>
          <div className="row">
            <div className="col">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Name:</label>
                  <input name="name" type="text" className="form-control" placeholder="Name" onChange={this.handleInputChange} value={this.state.name}/>
                </div>
                <div className="form-group">
                  <label>Code:</label>
                  <input type="text" name="code" className="form-control"  placeholder="Code" onChange={this.handleInputChange} value={this.state.code}/>
                </div>
                <div className="form-group">
                  <label>Score:</label>
                  <input type="text" name="score" className="form-control"  placeholder="Score" onChange={this.handleInputChange} value={this.state.score}/>
                </div>
                <button type="submit" className="btn btn-info" >Submit</button>
              </form>
              </div>
            </div>
        </div>
      );
    }
};

export default EditPage;
