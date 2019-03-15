import React, { Component } from 'react';

class EditTeam extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            description: null, 
            imageUrl: null,
            racers: null,
            points: null,
            id: null   
        }

        this.handleChange = this.props.handleChange.bind(this);
    }

    componentDidMount = async () => {
        let data = await fetch('http://localhost:9999/feed/team/details/' + this.props.match.params.id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        this.setState({
            id: data.team._id,
            name: data.team.name,
            description: data.team.description, 
            imageUrl: data.team.imageUrl,
            racers: data.team.racers,
            points: data.team.points   
        })
        
        console.log(this.state);
      };

    render() {

        return (
            <main id="site-content">
                <section className="basic" id="welcomeAnonymous">
                    <section className="login" id="loginView">
                        <form onSubmit={(event) => this.props.handleEditDeleteSubmit(event, this.state, 'team', 'edit', this.state.id)} id="formLogin">
                        <div>
                    <p className="field">
                      <label htmlFor="name">Name</label>
                      <span className="input">
                        <input onChange={this.handleChange} type="text" name="name" id="name" defaultValue={this.state.name} />
                        <span className="actions" />
                      </span>
                    </p>
                    <p className="field">
                      <label htmlFor="name">Racers</label>
                      <span className="input">
                        <input onChange={this.handleChange} type="text" name="racers" id="name" defaultValue={this.state.racers} />
                        <span className="actions" />
                      </span>
                    </p>
                    <p className="field">
                      <label htmlFor="description">Description</label>
                      <span className="input">
                        <input onChange={this.handleChange} type="text" name="description" id="description" defaultValue={this.state.description} />
                        <span className="actions" />
                      </span>
                    </p>
                    <p className="field">
                      <label htmlFor="image">Image</label>
                      <span className="input">
                        <input onChange={this.handleChange} type="text" name="imageUrl" id="image" defaultValue={this.state.imageUrl} />
                        <span className="actions" />
                      </span>
                    </p>
                    <p className="field">
                      <label htmlFor="image">Current points</label>
                      <span className="input">
                        <input onChange={this.handleChange} type="number" name="points" defaultValue={this.state.points} />
                        <span className="actions" />
                      </span>
                    </p>
                    <input className="button" type="submit" value="Save" id="submitLogin" />
                  </div>
                        </form>
                    </section>
                </section>
            </main>
        );

    }
}

export default EditTeam;