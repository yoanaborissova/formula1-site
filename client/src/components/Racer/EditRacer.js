import React, { Component } from 'react';

class EditRacer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            information: null, 
            imageUrl: null,
            team: null,
            points: null,
            id: null   
        }

        this.handleChange = this.props.handleChange.bind(this);
    }

    componentDidMount = async () => {
        let data = await fetch('http://localhost:9999/feed/racer/details/' + this.props.match.params.id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        this.setState({
            id: data.racer._id,
            name: data.racer.name,
            information: data.racer.information, 
            imageUrl: data.racer.imageUrl,
            team: data.racer.team,
            points: data.racer.points   
        })
        
        console.log(this.state);
      };

    render() {

        return (
            <main id="site-content">
                <section className="basic" id="welcomeAnonymous">
                    <section className="login" id="loginView">
                        <form onSubmit={(event) => this.props.handleEditDeleteSubmit(event, this.state, 'racer', 'edit', this.state.id)} id="formLogin">
                        <div>
                    <p className="field">
                      <label htmlFor="name">Name</label>
                      <span className="input">
                        <input onChange={this.handleChange} type="text" name="name" id="name" defaultValue={this.state.name} />
                        <span className="actions" />
                      </span>
                    </p>
                    <p className="field">
                      <label htmlFor="name">Team</label>
                      <span className="input">
                        <input onChange={this.handleChange} type="text" name="team" defaultValue={this.state.team} />
                        <span className="actions" />
                      </span>
                    </p>
                    <p className="field">
                      <label htmlFor="description">Information</label>
                      <span className="input">
                        <input onChange={this.handleChange} type="text" name="information" id="description" defaultValue={this.state.information} />
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

export default EditRacer;