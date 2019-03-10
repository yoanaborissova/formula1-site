import React, {Component} from 'react';
import { Link } from 'react-router-dom'; 

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: null,
      password: null, 
    }

    this.handleChange = this.props.handleChange.bind(this);
  }

  render() {
    return (
        <section className="basic" id="welcomeAnonymous">
        <h1>Join us to see the latest F1 news, results and updates!</h1>
        <section className="login" id="loginView">
          <form onSubmit={(event) => this.props.handleSubmit(event, this.state, false)}>
            <p className="field">
              <label htmlFor="username" id>Username</label>
              <span className="input">
                <input onChange={this.handleChange} type="text" name="username" id="username" placeholder="Username" />
                <span className="actions" />
                <i className="fas fa-user" />
              </span>
            </p>
            <p className="field">
              <label htmlFor="password">Password</label>
              <span className="input">
                <input onChange={this.handleChange} type="password" name="password" id="password" placeholder="Password" />
                <span className="actions" />
                <i className="fas fa-key" />
              </span>
            </p>
            <input className="button" type="submit" value="Login" id="submitLogin" />
            <br />
            <br />
            <Link to="/register" className="register-ref">Don't have an account? Sign up!</Link>
          </form>
        </section>
      </section>
    );
  }
}

export default Login;