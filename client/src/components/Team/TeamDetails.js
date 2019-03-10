import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 

class TeamDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      selectedTeam: this.props.selectedTeam,
    };

    
  }

  componentDidMount = async () => {
    let data = await fetch('http://localhost:9999/feed/team/details/' + this.props.match.params.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json());
    this.setState({selectedTeam: data.team})
    console.log(data);
  };

  render() {
    return (
        <main id="site-content">
        {
        <div className="article">
        <div>
          <h2>{this.state.selectedTeam.name}</h2>
          <h4>Current points: {this.state.selectedTeam.points}</h4>
          <h6>Racers: {this.state.selectedTeam.racers}</h6>
        </div>
        <div>
          <img className="img-article" src={this.state.selectedTeam.imageUrl} alt="Not found." />
          <p>{this.state.selectedTeam.description}</p>
        </div>
        {this.props.isAdmin ? <Link to="#" onClick={(event) => this.props.handleEditDeleteSubmit(event, this.state, 'team', 'delete', this.state.selectedTeam._id)} className="button">Delete</Link> : null}
        {this.props.isAdmin ? <Link to={"/team/edit/" + this.state.selectedTeam._id} className="button">Edit</Link> : null}
      </div>
        }
      </main>  
    );
  }
}

export default TeamDetails;