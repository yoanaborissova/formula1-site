import React, { Component } from 'react';
import { Link } from 'react-router-dom';                                


class ArticleDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      selectedArticle: this.props.selectedArticle,
      articleComments: this.props.articleComments,
      article: null,
      Authorization: localStorage.getItem('token')
    };
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
      articleComments: data.comments,
      article: data.article._id
    })
  };

  render() {
    return (
        <main id="site-content">
        <div className="article">
          <div>
            <h2>{this.state.selectedArticle.title}</h2>
          </div>
          <div>
            <p>{this.state.selectedArticle.content}</p>
          </div>
          <div>
            <img className="img-article" src={this.state.selectedArticle.imageUrl} />
          </div>  
            {this.props.isAdmin ? <Link to="#" onClick={(event) => this.props.handleEditDeleteSubmit(event, this.state, 'article', 'delete', this.state.selectedArticle._id)} className="button">Delete</Link> : null}
            {this.props.isAdmin ? <Link to={"/article/edit/" + this.state.selectedArticle._id} className="button">Edit</Link> : null}
            {this.props.username ? <Link to={"/article/comment/" + this.state.selectedArticle._id} className="button">Add a comment</Link> : null}
        </div>
        <div className="article">
        <h4>Comments:</h4>
        {!this.props.username ? <h6><Link to="/login">Login</Link> to add comments!</h6> : null}
        {
        this.state.articleComments.map(c => 
          <div className="comment" key={c._id}>
            <h6>{c.user}:</h6>
            <div>
            <p>{c.content}</p>
            </div>
            <div>
            {this.props.isAdmin || c.user === this.props.username ?
            <a href="#" onClick={(event) => this.props.handleEditDeleteSubmit(event, this.state, 'comment', 'delete', c._id)} className="button">Delete</a>
            : null}
            { c.user === this.props.username ?
            <a href={"/comment/edit/" + c._id} className="button">Edit</a>
            : null}
            </div>
          </div>
        )
        }
        
        </div>

      </main>  
    );
  }
}

export default ArticleDetails;