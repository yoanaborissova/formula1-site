import React, { Component } from 'react';

class EditArticle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedArticle: this.props.selectedArticle,
            title: null,
            content: null, 
            imageUrl: null            
        }

        this.handleChange = this.props.handleChange.bind(this);
    }

    componentDidMount = async () => {
        let data = await fetch('http://localhost:9999/feed/article/details/' + this.props.match.params.id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        this.setState({
            selectedArticle: data.article,
            title: data.article.title,
            content: data.article.content,
            imageUrl: data.article.imageUrl,
        })
        
        console.log(this.state);
      };

    render() {

        return (
            <main id="site-content">
                <section className="basic" id="welcomeAnonymous">
                    <section className="login" id="loginView">
                        <form onSubmit={(event) => this.props.handleEditDeleteSubmit(event, this.state, 'article', 'edit', this.state.selectedArticle._id)} id="formLogin">
                            <p className="field">
                                <label htmlFor="name">Title</label>
                                <span className="input">
                                    <input  onChange={this.handleChange} type="text" name="title" defaultValue={this.state.selectedArticle.title} />
                                    <span className="actions" />
                                </span>
                            </p>
                            <p className="field">
                                <label htmlFor="name">Content</label>
                                <span className="input">
                                    <input onChange={this.handleChange} type="text" name="content" defaultValue={this.state.selectedArticle.content} />
                                    <span className="actions" />
                                </span>
                            </p>
                            <p className="field">
                                <label htmlFor="image">Image</label>
                                <span className="input">
                                    <input onChange={this.handleChange} type="text" name="imageUrl" id="image" defaultValue={this.state.selectedArticle.imageUrl} />
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