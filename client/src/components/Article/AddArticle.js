import React, { Component } from 'react';

class AddArticle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: null,
            content: null,
            imageUrl: null,
        }

        this.handleChange = this.props.handleChange.bind(this);
    }

    render() {
        return (
            <main id="site-content">
                <section className="basic" id="welcomeAnonymous">
                    <section className="login" id="loginView">
                        <form onSubmit={(event) => this.props.handleCreateSubmit(event, this.state, 'article')} id="formLogin">
                            <p className="field">
                                <label htmlFor="name">Title</label>
                                <span className="input">
                                    <input  onChange={this.handleChange} type="text" name="title" placeholder="Title" />
                                    <span className="actions" />
                                </span>
                            </p>
                            <p className="field">
                                <label htmlFor="name">Content</label>
                                <span className="input">
                                    <textarea onChange={this.handleChange} type="text" rows="3" cols="60" name="content" placeholder="Content" />
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
                            <input className="button" type="submit" value="Add article" />
                        </form>
                    </section>
                </section>
            </main>
        );
    }
}

export default AddArticle;