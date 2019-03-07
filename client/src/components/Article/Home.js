import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      articles: this.props.articles,
    };
  }

  componentDidMount = async () => {
    let data = await fetch('http://localhost:9999/feed/articles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json());
    this.setState({articles: data.resArticles})
  };

  render() {
    return (
        <main id="site-content">
        {this.props.isAdmin ? <form method="GET" action="/article/add" className="button-form" id="article-add"><button className="button" id="button-add">Add article</button></form> : null}
        {
        this.state.articles.map(a => 
          <div className="article" key={a._id}>
            <h2>{a.title}</h2>
            <img className="img" src={a.imageUrl}></img>
            <p>{a.content.substr(0, a.content.length / 2) + '...'}</p>
            <Link to={"/article/details/" + a._id} className="button">More</Link>
          </div>
        )
        }
      </main>  
    );
  }
}

export default Home;