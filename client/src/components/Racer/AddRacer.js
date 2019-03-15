import React, { Component } from 'react';

class AddRacer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            information: null,
            team: null,
            points: null,
            imageUrl: null
        }

        this.handleChange = this.props.handleChange.bind(this);
    }

    render() {
        return (
            <main id="site-content">
                <section className="basic" id="welcomeAnonymous">
                    <section className="login" id="loginView">
                        <form onSubmit={(event) => this.props.handleCreateSubmit(event, this.state, 'racer')} >
                            <p className="field">
                                <label htmlFor="name">Name</label>
                                <span className="input">
                                    <input onChange={this.handleChange} type="text" name="name" id="name" placeholder="Name" />
                                    <span className="actions" />
                                </span>
                            </p>
                            <p className="field">
                                <label htmlFor="name">Team</label>
                                <span className="input">
                                    <input onChange={this.handleChange} type="text" name="team" id="team" placeholder="Team" />
                                    <span className="actions" />
                                </span>
                            </p>
                            <p className="field">
                                <label htmlFor="name">Information</label>
                                <span className="input">
                                    <textarea onChange={this.handleChange} type="text" rows="2" cols="60" name="information" placeholder="Information" />
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
                                <label htmlFor="currentPoints">Current points</label>
                                <span className="input">
                                    <input onChange={this.handleChange} type="number" name="points" placeholder="Points" />
                                    <span className="actions" />
                                </span>
                            </p>
                            <input className="button" type="submit" value="Add racer" id="submitLogin" />
                        </form>
                    </section>
                </section>
            </main>
        );
    }
}

export default AddRacer;