import React from 'react';
import { NavLink, Link, Switch } from 'react-router-dom';

function Navbar(props) {
    return (
        <header id="site-header">
        <nav className="navbar" id="navbar">
            <section className="navbar-dashboard" id="myPetsAddPet">
                <div className="first-bar">
                    <a className="button" href="/">Home</a>
                    <a className="button" href="/teams">Teams</a>
                    <a className="button" href="/racers">Racers</a>
                    <a className="button" href="/shop">Shop</a>
                    <a className="button" href="/about">About Us</a>
                </div>
                <div className="second-bar">
                <Switch>                    
                    {
                        props.username ?
                        <React.Fragment>
                            <ul>
                                <li>
                                    Welcome, {props.username}!
                                </li>
                                <li>
                                    <a href="" onClick={props.logout}> Logout</a>
                                </li>
                            </ul>                               
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <ul>
                                <li>
                                    <a href="/register"> Register</a>
                                </li>
                                <li>
                                    <a href="/login"> Login</a>
                                </li>
                            </ul>
                        </React.Fragment>                        
                    }
                </Switch>       
                </div>
            </section>
        </nav>
    </header>
    );
}

export default Navbar;