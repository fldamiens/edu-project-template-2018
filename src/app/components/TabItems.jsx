import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configure from './store';

class TabItems extends Component {
    constructor() {
      super();
      this.state = {
        datas : [],
      };
    }

    componentDidMount(){
      fetch('/api/episodes', {
        method: 'GET',
      }).then(result => {
        return result.json();
      }).then(data => {
        let datas = data.message.map((episode)=>{
          return(
            <tr key={episode.data.id}>
              <td>{episode.data.id}</td>
              <td>{episode.data.name}</td>
              <td>{episode.data.code}</td>
              <td>{episode.data.score}</td>
              <td>
                <button style={{marginLeft:'8px'}} className="btn btn-primary" onClick={() => {this.deleteEpisode(episode.data.id)}} >-</button>
                <button style={{marginLeft:'8px'}} className="btn btn-primary" onClick={() => {this.deleteEpisode(episode.data.id)}} >-></button>
              </td>
            </tr>
          )
        });
        this.setState({datas:datas});
      })
    }

    deleteEpisode(id){
      var self = this;
      fetch('/api/episodes/'+id, {
        method: 'DELETE',
      }).then(result => {
        result.json().then(function(res){
          let newData = self.state.datas.slice();
          newData = newData.filter(e => e.key !== res.message.data.id)
          self.setState({datas:newData})
        })
      })
    }

    render() {
        return(
          <tbody>
            {this.state.datas}
          </tbody>
        );
    }
};

export default TabItems;
