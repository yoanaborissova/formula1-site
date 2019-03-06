import React, {Component} from 'react';

class Register extends Component {
    constructor(props){
        super(props);
    
        this.state = {
          username: null,
          password: null, 
          repeatPassword: null
        }
    
        this.handleChange = this.props.handleChange.bind(this);
      }

    render() {
    return (
        <section className="basic" id="welcomeAnonymous">
            <h1>Join us to see the latest F1 news, results and updates!</h1>
            <section className="login" id="loginView">
                <form onSubmit={(event) => this.props.handleSubmit(event, this.state, true)}>
                    <p className="field">
                        <label htmlFor="username" id>Username</label>
                        <span className="input">
                            <input onChange={this.handleChange} type="text" name="username" placeholder="Username" />
                            <span className="actions" />
                            <i className="fas fa-user" />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="password">Password</label>
                        <span className="input">
                            <input onChange={this.handleChange} type="password" name="password" placeholder="Password" />
                            <span className="actions" />
                            <i className="fas fa-key" />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="password">Repeat Password</label>
                        <span className="input">
                            <input onChange={this.handleChange} type="password" name="repeatPassword" placeholder="Repeat Password" />
                            <span className="actions" />
                            <i className="fas fa-key" />
                        </span>
                    </p>
                    <input className="button" type="submit" value="Register" id="submitLogin" />
                    <br />
                    <br />
                    <a href="/login" className="register-ref">Already have an account? Sign in!</a>
                </form>
            </section>
        </section>
    );
    }
}

export default Register;