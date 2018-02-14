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

  constructor(props) {
    super(props);
    this.state = {
      datas : [],
    };

    this.addEpisode = this.addEpisode.bind(this);
  }

  addEpisode(episode) {
    let newDatas = this.state.datas.slice();
    newDatas.push(episode);
    this.setState({datas:newDatas});
  }

  componentDidMount(){
    fetch('/api/episodes', {
      method: 'GET',
    }).then(result => {
      return result.json();
    }).then(data => {
      let datas = data.message;
      let listEp = [];
      datas.forEach((elt) => listEp.push(elt.data));
      this.setState({datas:listEp});
    })
  }
    render() {
      const episodeRemoved = (episode) => {
          let newData = this.state.datas.slice();
          newData = newData.filter(e => e.id !== episode.id)
          this.setState({datas:newData});
      };

        return(
          <div>
            <table className="table table-striped">
              <TabHeader />
              {this.state.datas.map(function(ep, index){
                    return <TabItems removeEpisode={episodeRemoved} key={ep.id} crtEpisode={ep}/>;
              })}
            </table>
          </div>
        );
    }
};

export default ListEpisodes;
