import React, { Component } from 'react';

class AddComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.username,
            content: null,
            article: this.props.match.params.id,
        }

        this.handleChange = this.props.handleChange.bind(this);
    }

    render() {
        return (
            <main id="site-content">
                <section className="basic" id="welcomeAnonymous">
                    <section className="login" id="loginView">
                        <form onSubmit={(event) => this.props.handleCreateSubmit(event, this.state, 'comment')}>
                            <p className="field">
                                <span className="input">
                                    <textarea onChange={this.handleChange} rows={3} cols={60} type="text" name="content" placeholder="Please write your comment here" defaultValue={""} />
                                    <span className="actions" />
                                </span>
                            </p>
                            <input className="button" type="submit" value="Add comment" id="submitLogin" />
                        </form>
                    </section>
                </section>
            </main>
        );
    }
}

export default AddComment;