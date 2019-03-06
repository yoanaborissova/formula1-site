import React, { Component } from 'react';

class Teams extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        teams: this.props.teams,
    };
  }

  componentDidMount = async () => {
    let data = await fetch('http://localhost:9999/feed/teams', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json());
    this.setState({teams: data.resTeams})
    console.log(data);
  };

  render() {
    return (
        <main id="site-content">
        {this.props.isAdmin ? <form method="GET" action="/team/add" className="button-form"><button id="button-add" className="button">Add team</button></form> : null}
        {
        this.state.teams.map(t => 
          <div className="article" key={t._id}>
              <h2>{t.name}</h2>
                      <img className="img" src={t.imageUrl} />
                      <p>Points: {t.points}</p>
              <a href={"team/details/" + t._id} className="button">More about this team</a>
          </div>
        )
        }
        </main>      
    );
  }
}

export default Teams;