import React, { Component } from 'react';

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
          <img className="img-article" src={this.state.selectedTeam.imageUrl} />
          <p>{this.state.selectedTeam.description}</p>
        </div>
        {this.props.isAdmin ? <a href="#" onClick={(event) => this.props.handleEditDeleteSubmit(event, this.state, 'team', 'delete', this.state.selectedTeam._id)} className="button">Delete</a> : null}
        {this.props.isAdmin ? <a href={"/team/edit/" + this.state.selectedTeam._id} className="button">Edit</a> : null}
      </div>
        }
      </main>  
    );
  }
}

export default TeamDetails;