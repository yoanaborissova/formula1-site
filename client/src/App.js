import React, { Component, lazy, Suspense } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import createBrowserHistory from 'history/createBrowserHistory';

import './App.css';
import Navbar from './components/Static/Navbar';
import Footer from './components/Static/Footer';
import Home from './components/Article/Home';
const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));
const About = lazy(() => import('./components/Static/About'));
const Teams = lazy(() => import('./components/Team/Teams'));
const Racers = lazy(() => import('./components/Racer/Racers'));
const AddArticle = lazy(() => import('./components/Article/AddArticle'));
const AddTeam = lazy(() => import('./components/Team/AddTeam'));
const AddRacer = lazy(() => import('./components/Racer/AddRacer'));
const Shop = lazy(() => import('./components/Shop/Shop'));
const AllOrders = lazy(() => import('./components/Shop/AllOrders'));
const MyOrders = lazy(() => import('./components/Shop/MyOrders'));
const AddProduct = lazy(() => import('./components/Shop/AddProduct'));
const ArticleDetails = lazy(() => import('./components/Article/ArticleDetails'));
const TeamDetails = lazy(() => import('./components/Team/TeamDetails'));
const RacerDetails = lazy(() => import('./components/Racer/RacerDetails'));
const ProductDetails = lazy(() => import('./components/Shop/ProductDetails'));
const AddComment = lazy(() => import('./components/Comment/AddComment'));
const EditArticle = lazy(() => import('./components/Article/EditArticle'));
const EditComment = lazy(() => import('./components/Comment/EditComment'));
const EditTeam = lazy(() => import('./components/Team/EditTeam'));
const EditRacer = lazy(() => import('./components/Racer/EditRacer'));
const EditProduct = lazy(() => import('./components/Shop/EditProduct'));
const NotFound = lazy(() => import('./components/Static/NotFound'));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      isAdmin: false,
      token: '',
      articles: [],
      teams: [],
      racers: [],
      products: [],
      orders: [],
      selectedArticle: '',
      selectedTeam: '',
      selectedRacer: '',
      selectedProduct: '',
      articleComments: [],
      history: createBrowserHistory()
    }

    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event, data, isSignUp) {
    event.preventDefault();
    await fetch('http://localhost:9999/auth/sign' + (isSignUp ? 'up' : 'in'), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
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
          toast.error(responseBody.message)
        }
      })
  }

  handleCreateSubmit(event, data, element) {
    event.preventDefault();
    fetch('http://localhost:9999/feed/'+ element + '/create', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + localStorage.getItem('token')
     }
    })
      .then(rawData => rawData.json())
      .then(responseBody => {
        if (!responseBody.error) {
          toast.success(responseBody.message);
        } else {
          toast.error(responseBody.message)
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
        } else if (element === 'order'){
          this.state.history.push('/myorders');
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
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
       },
      
    })
      .then(rawData => rawData.json())
      .then(responseBody => {
        if (!responseBody.error) {
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
       } else if (action === 'delete') {
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
       } else {
        this.state.history.push('/');
        this.state.history.push('/allorders');
        this.forceUpdate();
       }
      })
  }

  logout(event) {
    event.preventDefault();

    window.sessionStorage.clear();
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');

    this.setState({
      username: null,
      isAdmin: false,
    })

    this.state.history.push('/');

    toast.success('Logout successful!');
  }

  render() {
    return (
      <Router history={this.state.history}>
      <div className="App">
          <div id="container">
            <ToastContainer autoClose={2500} hideProgressBar={true} closeButton={false}></ToastContainer>
            <Suspense fallback={<h3>Loading...</h3>}>
            <Navbar username={this.state.username} isAdmin={this.state.isAdmin} logout = {this.logout} {...this.state}/>
            <Switch>
              <Route render={(props) => <Home isAdmin={this.state.isAdmin} articles={this.state.articles} {...this.state} {...props}/>} path="/" exact/>
              <Route render={(props) => !this.state.username ? <Login {...props} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/> : <Redirect to={{ pathname: '/' }} />} path="/login" /> 
              <Route render={(props) => !this.state.username ? <Register {...props} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/> : <Redirect to={{ pathname: '/' }} />} path="/register" />
              <Route render={(props) => <Teams isAdmin={this.state.isAdmin} teams={this.state.teams} {...this.state} {...props}/>} path="/teams" exact/>
              <Route render={(props) => <Racers isAdmin={this.state.isAdmin} teams={this.state.racers} {...this.state} {...props}/>} path="/racers" exact/>
              <Route render={(props) => <Shop isAdmin={this.state.isAdmin} products={this.setState.products} {...this.state} {...props}/>} path="/shop" exact/>
              <Route render={(props) => this.state.isAdmin ? <AllOrders isAdmin={this.state.isAdmin} orders={this.setState.orders} handleEditDeleteSubmit={this.handleEditDeleteSubmit} {...this.state} {...props}/>  : <Redirect to={{ pathname: '/login' }} />} path="/allorders" exact/>
              <Route render={(props) => this.state.username ? <MyOrders isAdmin={this.state.isAdmin} orders={this.setState.orders} handleEditDeleteSubmit={this.handleEditDeleteSubmit} {...this.state} {...props}/> : <Redirect to={{ pathname: '/login' }} />} path="/myorders" exact/>
              <Route render={(props) => this.state.isAdmin ? <AddArticle {...props} handleChange={this.handleChange} handleCreateSubmit={this.handleCreateSubmit}/> : <Redirect to={{ pathname: '/login' }} />} path="/article/add" /> 
              <Route render={(props) => this.state.isAdmin ? <AddTeam {...props} handleChange={this.handleChange} handleCreateSubmit={this.handleCreateSubmit}/> : <Redirect to={{ pathname: '/login' }} />} path="/team/add" />  
              <Route render={(props) => this.state.isAdmin ? <AddRacer {...props} handleChange={this.handleChange}  handleCreateSubmit={this.handleCreateSubmit}/> : <Redirect to={{ pathname: '/login' }} />} path="/racer/add" />
              <Route render={(props) => this.state.isAdmin ? <AddProduct {...props} handleChange={this.handleChange} handleCreateSubmit={this.handleCreateSubmit}/> : <Redirect to={{ pathname: '/login' }} />} path="/product/add" />  
              <Route render={(props) => <ArticleDetails {...props} username={this.username} selectedArticle={this.selectedArticle} handleEditDeleteSubmit={this.handleEditDeleteSubmit} {...this.state} />} path="/article/details/:id" />
              <Route render={(props) => <TeamDetails {...props} selectedTeam={this.selectedTeam} handleEditDeleteSubmit={this.handleEditDeleteSubmit} {...this.state} />} path="/team/details/:id" />
              <Route render={(props) => <RacerDetails {...props} selectedRacer={this.selectedRacer} handleEditDeleteSubmit={this.handleEditDeleteSubmit} {...this.state} />} path="/racer/details/:id" />
              <Route render={(props) => <AddProduct {...props} handleChange={this.handleChange} handleCreateSubmit={this.handleCreateSubmit}/>} path="/product/add" />  
              <Route render={(props) => <ProductDetails {...props} selectedProduct={this.selectedProduct} handleCreateSubmit={this.handleCreateSubmit} handleEditDeleteSubmit={this.handleEditDeleteSubmit} {...this.state} />} path="/product/details/:id" />
              <Route render={(props) => this.state.username ? <AddComment {...props} handleChange={this.handleChange} handleCreateSubmit={this.handleCreateSubmit} username={this.username} {...this.state} /> : <Redirect to={{ pathname: '/login' }} />} path="/article/comment/:id" />
              <Route render={(props) => this.state.isAdmin ? <EditArticle {...props} handleChange={this.handleChange} handleEditDeleteSubmit={this.handleEditDeleteSubmit} selectedArticle={this.selectedArticle} {...this.state} /> : <Redirect to={{ pathname: '/login' }} />} path="/article/edit/:id" />
              <Route render={(props) => this.state.username ? <EditComment {...props} username={this.username} handleChange={this.handleChange} handleEditDeleteSubmit={this.handleEditDeleteSubmit} {...this.state} /> : <Redirect to={{ pathname: '/login' }} />} path="/comment/edit/:id" />
              <Route render={(props) => this.state.isAdmin ? <EditTeam {...props} handleChange={this.handleChange} handleEditDeleteSubmit={this.handleEditDeleteSubmit} {...this.state} /> : <Redirect to={{ pathname: '/login' }} />} path="/team/edit/:id" />
              <Route render={(props) => this.state.isAdmin ? <EditProduct {...props} handleChange={this.handleChange} handleEditDeleteSubmit={this.handleEditDeleteSubmit} {...this.state} /> : <Redirect to={{ pathname: '/login' }} />} path="/product/edit/:id" />
              <Route render={(props) => this.state.isAdmin ? <EditRacer {...props} handleChange={this.handleChange} handleEditDeleteSubmit={this.handleEditDeleteSubmit} {...this.state} /> : <Redirect to={{ pathname: '/login' }} />} path="/racer/edit/:id" />
              <Route render={() => <About />} path="/about" />  
              <Route component={() => <NotFound />}/>   
            </Switch>
            </Suspense>
            <Footer />
          </div>
      </div>
      </Router>
    );
  }
}

export default App;
