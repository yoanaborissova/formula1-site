import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 

class RacerDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      selectedRacer: this.props.selectedRacer,
    };
  }

  componentDidMount = async () => {
    let data = await fetch('http://localhost:9999/feed/racer/details/' + this.props.match.params.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json());
    this.setState({selectedRacer: data.racer})
  };

  render() {
    return (
        <main id="site-content">
        {
        <div className="article">
        <div>
          <h2>{this.state.selectedRacer.name}</h2>
          <h4>Current points: {this.state.selectedRacer.points}</h4>
          <h6>Team: {this.state.selectedRacer.team}</h6>
        </div>
        <div>
          <img className="img-article" src={this.state.selectedRacer.imageUrl} alt="Not found." />
          <p>{this.state.selectedRacer.information}</p>
        </div>
        {this.props.isAdmin ? <Link to="#" onClick={(event) => this.props.handleEditDeleteSubmit(event, this.state, 'racer', 'delete', this.state.selectedRacer._id)} className="button">Delete</Link> : null}
        {this.props.isAdmin ? <Link to={"/racer/edit/" + this.state.selectedRacer._id}  className="button">Edit</Link> : null}
      </div>
        }
      </main>  
    );
  }
}

export default RacerDetails;