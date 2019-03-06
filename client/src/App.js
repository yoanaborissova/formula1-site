import React, { Component } from 'react';
import { Router, Link, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import createBrowserHistory from 'history/createBrowserHistory';

import './App.css';
import Navbar from './components/Static/Navbar';
import Footer from './components/Static/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import About from './components/Static/About';
import Home from './components/Article/Home';
import Teams from './components/Team/Teams';
import Racers from './components/Racer/Racers';
import AddArticle from './components/Article/AddArticle';
import AddTeam from './components/Team/AddTeam';
import AddRacer from './components/Racer/AddRacer';
import Shop from './components/Shop/Shop';
import AddProduct from './components/Shop/AddProduct';
import ArticleDetails from './components/Article/ArticleDetails';
import TeamDetails from './components/Team/TeamDetails';
import RacerDetails from './components/Racer/RacerDetails';
import AddComment from './components/Comment/AddComment';
import EditArticle from './components/Article/EditArticle';
import EditComment from './components/Comment/EditComment';
import EditTeam from './components/Team/EditTeam';
import EditRacer from './components/Racer/EditRacer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      isAdmin: false,
      articles: [],
      teams: [],
      racers: [],
      selectedArticle: '',
      selectedTeam: '',
      selectedRacer: '',
      articleComments: [],
      history: createBrowserHistory()
    }

    this.logout = this.logout.bind(this); 
    this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
    this.handleEditDeleteSubmit = this.handleEditDeleteSubmit.bind(this);
  }

  componentWillMount() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (localStorage.getItem('username')) {
      this.setState({
        username: localStorage.getItem('username'),
        isAdmin: isAdmin
      })
    }
  }

  handleChange(event) {
    // console.log(`${[event.target.name]}: ${event.target.value}`)
    // console.log(this.state);
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event, data, isSignUp) {
    event.preventDefault();
    await fetch('http://localhost:9999/auth/sign' + (isSignUp ? 'up' : 'in'), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(rawData => rawData.json())
      .then(responseBody => {
        if (responseBody.username) {
          this.setState({
            username: responseBody.username
          })
          this.state.history.push('/');
          if (responseBody.isAdmin) {
            this.setState({
              isAdmin: true
            })
          }
          localStorage.setItem('username', responseBody.username);
          localStorage.setItem('isAdmin', responseBody.isAdmin);
          localStorage.setItem('token', responseBody.token);
        
          toast.success(`Welcome ${responseBody.username}!`);
        } else {
          toast.error(responseBody.message, {
            closeButton: false
          })
        }
      })
  }

  handleCreateSubmit(event, data, element) {
    event.preventDefault();
    fetch('http://localhost:9999/feed/'+ element + '/create', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(rawData => rawData.json())
      .then(responseBody => {
        if (!responseBody.errors) {
          toast.success(responseBody.message, {
            closeButton: false
          });
        } else {
          toast.error(responseBody.message, {
            closeButton: false
          })
        }

        if (element === 'article'){
          this.state.history.push('/');
          this.forceUpdate();
        } else if (element === 'product'){
          this.state.history.push('/shop');
          this.forceUpdate();
        } else if (element === 'comment'){
          this.state.history.push('/article/details/' + data.article);
          this.forceUpdate(); 
        } else {
          this.state.history.push('/' + element + 's');
          this.forceUpdate();
        }
      })
  }

  handleEditDeleteSubmit(event, data, element, action, id) {
    event.preventDefault();
    console.log(data);
    fetch('http://localhost:9999/feed/'+ element + '/' + action + '/' + id, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(rawData => rawData.json())
      .then(responseBody => {
        if (!responseBody.errors) {
          toast.success(responseBody.message);
        } else {
          toast.error(responseBody.message)
        }

       if(action === 'edit'){
        if (element === 'comment'){
          this.state.history.push('/article/details/' + data.article);
          this.forceUpdate(); 
        } else {
          this.state.history.push('/' + element + '/details/' + id);
          this.forceUpdate();
        }
       } else {
        if (element === 'article'){
          this.state.history.push('/');
          this.forceUpdate();
        } else if (element === 'product'){
          this.state.history.push('/shop');
          this.forceUpdate();
        } else if (element === 'comment'){
          this.state.history.push('/');
          this.state.history.push('/article/details/' + data.article);
          this.forceUpdate();
        } else {
          this.state.history.push('/' + element + 's');
          this.forceUpdate();
        }
       }
      })
  }

  logout(event) {
    event.preventDefault();

    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');

    this.setState({
      username: null,
      isAdmin: false,
    })

    this.state.history.push('/');

    toast.success('Logout successful!',  {
      closeButton: false
    });
  }

  render() {
    return (
      <Router history={this.state.history}>
      <div className="App">
          <div id="container">
            <ToastContainer autoClose={2500} hideProgressBar={true} closeButton={false}></ToastContainer>
            <Navbar username={this.state.username} isAdmin={this.state.isAdmin} logout = {this.logout} {...this.state}/>
            <Switch>
              <Route render={(props) => <Home isAdmin={this.state.isAdmin} articles={this.state.articles} {...this.state} {...props}/>} path="/" exact/>
              <Route render={(props) => <Login {...props} handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange}/>} path="/login" /> 
              <Route render={(props) => <Register {...props} handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange}/>} path="/register" />
              <Route render={(props) => <Teams isAdmin={this.state.isAdmin} teams={this.state.teams} {...this.state} {...props}/>} path="/teams" exact/>
              <Route render={(props) => <Racers isAdmin={this.state.isAdmin} teams={this.state.racers} {...this.state} {...props}/>} path="/racers" exact/>
              <Route render={(props) => <Shop isAdmin={this.state.isAdmin} {...props}/>} path="/shop" exact/>
              <Route render={(props) => <AddArticle {...props} handleChange={this.handleChange} handleCreateSubmit={this.handleCreateSubmit}/>} path="/article/add" /> 
              <Route render={(props) => <AddTeam {...props} handleChange={this.handleChange} handleCreateSubmit={this.handleCreateSubmit}/>} path="/team/add" />  
              <Route render={(props) => <AddRacer {...props} handleChange={this.handleChange}  handleCreateSubmit={this.handleCreateSubmit}/>} path="/racer/add" />
              <Route render={(props) => <AddProduct {...props} handleChange={this.handleChange} handleCreateSubmit={this.handleCreateSubmit}/>} path="/product/add" />  
              <Route render={(props) => <ArticleDetails {...props} selectedArticle={this.selectedArticle} handleEditDeleteSubmit={this.handleEditDeleteSubmit} {...this.state} />} path="/article/details/:id" />
              <Route render={(props) => <TeamDetails {...props} selectedTeam={this.selectedTeam} handleEditDeleteSubmit={this.handleEditDeleteSubmit} {...this.state} />} path="/team/details/:id" />
              <Route render={(props) => <RacerDetails {...props} selectedRacer={this.selectedRacer} handleEditDeleteSubmit={this.handleEditDeleteSubmit} {...this.state} />} path="/racer/details/:id" />
              <Route render={(props) => <AddComment {...props} handleChange={this.handleChange} handleCreateSubmit={this.handleCreateSubmit} username={this.username} {...this.state} />} path="/article/comment/:id" />
              <Route render={(props) => <EditArticle {...props} handleChange={this.handleChange} handleEditDeleteSubmit={this.handleEditDeleteSubmit} selectedArticle={this.selectedArticle} {...this.state} />} path="/article/edit/:id" />
              <Route render={(props) => <EditComment {...props} handleChange={this.handleChange} handleEditDeleteSubmit={this.handleEditDeleteSubmit} {...this.state} />} path="/comment/edit/:id" />
              <Route render={(props) => <EditTeam {...props} handleChange={this.handleChange} handleEditDeleteSubmit={this.handleEditDeleteSubmit} {...this.state} />} path="/team/edit/:id" />
              <Route render={(props) => <EditRacer {...props} handleChange={this.handleChange} handleEditDeleteSubmit={this.handleEditDeleteSubmit} {...this.state} />} path="/racer/edit/:id" />

              <Route render={() => <About />} path="/about" />     
            </Switch>
            <Footer />
          </div>
      </div>
      </Router>
    );
  }
}

export default App;
