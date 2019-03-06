import React, { Component } from 'react';

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
    console.log(data);
  };

  render() {
    return (
      <main id="site-content">
        {this.props.isAdmin ? <form method="GET" action="/racer/add" className="button-form"><button id="button-add" className="button">Add racer</button></form> : null}
        {
          this.state.racers.map(r =>
            <div className="article" key={r._id}>
              <h2>{r.name}</h2>
              <h6>Team: {r.team}</h6>
              <img className="img" src={r.imageUrl} />
              <p>Points: {r.points}</p>
              <a href={"/racer/details/" + r._id} className="button">More about this racer</a>
            </div>
          )
        }
      </main>
    );
  }
}

export default Racers;