import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 

class Racers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      racers: this.props.racers,
    };
  }

  componentDidMount = async () => {
    let data = await fetch('http://localhost:9999/feed/racers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json());
    this.setState({ racers: data.resRacers })
  };

  render() {
    return (
      <main id="site-content">
        {this.props.isAdmin ? <form method="GET" action="/racer/add" className="button-form"><button id="button-add" className="button">Add racer</button></form> : null}
        {
          this.state.racers.length > 0 ?
          this.state.racers.map(r =>
            <div className="article" key={r._id}>
              <h2>{r.name}</h2>
              <h6>Team: {r.team}</h6>
              <img className="img" src={r.imageUrl} alt="Not found." />
              <p>Points: {r.points}</p>
              <Link to={"/racer/details/" + r._id} className="button">More about this racer</Link>
            </div>
          )
          :
          <h3>No comments added yet.</h3>
          }  
        }
      </main>
    );
  }
}

export default Racers;