import React, { Component } from 'react';

class AddTeam extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            description: null,
            racers: null,
            imageUrl: null,
            points: null
        }

        this.handleChange = this.props.handleChange.bind(this);
    }

    render() {
        return (
            <main id="site-content">
            <section className="basic" id="welcomeAnonymous">
              <section className="login" id="loginView">
                <form onSubmit={(event) => this.props.handleCreateSubmit(event, this.state, 'team')}  id="formLogin">
                  <div>
                    <p className="field">
                      <label htmlFor="name">Name</label>
                      <span className="input">
                        <input onChange={this.handleChange} type="text" name="name" id="name" placeholder="Name" />
                        <span className="actions" />
                      </span>
                    </p>
                    <p className="field">
                      <label htmlFor="name">Racers</label>
                      <span className="input">
                        <input onChange={this.handleChange} type="text" name="racers" id="name" placeholder="Please write the racers, splitted by ','" />
                        <span className="actions" />
                      </span>
                    </p>
                    <p className="field">
                      <label htmlFor="description">Description</label>
                      <span className="input">
                        <textarea onChange={this.handleChange} rows={2} cols={60} type="text" name="description" id="description" placeholder="Description" defaultValue={""} />
                        <span className="actions" />
                      </span>
                    </p>
                    <p className="field">
                      <label htmlFor="image">Image</label>
                      <span className="input">
                        <input onChange={this.handleChange} type="text" name="imageUrl" id="image" placeholder="Image" />
                        <span className="actions" />
                      </span>
                    </p>
                    <p className="field">
                      <label htmlFor="image">Current points</label>
                      <span className="input">
                        <input onChange={this.handleChange} type="number" name="points" placeholder="Points" />
                        <span className="actions" />
                      </span>
                    </p>
                    <input className="button" type="submit" defaultValue="Add team" id="submitLogin" />
                  </div>
                </form>
              </section>
            </section>
          </main>
        );
    }
}

export default AddTeam;