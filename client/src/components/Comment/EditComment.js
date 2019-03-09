import React, { Component } from 'react';

class EditArticle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: null,
            selectedArticle: null,
            user: this.props.username
        }

        this.handleChange = this.props.handleChange.bind(this);
    }

    componentDidMount = async () => {
        let data = await fetch('http://localhost:9999/feed/comment/' + this.props.match.params.id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        this.setState({
            content: data.comment.content,
            article: data.comment.article
        })
        
        console.log(this.state);
      };

    render() {

        return (
            <main id="site-content">
                <section className="basic" id="welcomeAnonymous">
                    <section className="login" id="loginView">
                        <form onSubmit={(event) => this.props.handleEditDeleteSubmit(event, this.state, 'comment', 'edit', this.props.match.params.id)} id="formLogin">
                            <p className="field">
                                <label htmlFor="name">Content</label>
                                <span className="input">
                                    <input onChange={this.handleChange} type="text" name="content" defaultValue={this.state.content}/>
                                    <span className="actions" />
                                </span>
                            </p>
                            <input className="button" type="submit" value="Save" />
                        </form>
                    </section>
                </section>
            </main>
        );

    }
}

export default EditArticle;