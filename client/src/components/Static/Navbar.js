import React from 'react';
import { NavLink, Link, Switch } from 'react-router-dom';

function Navbar(props) {
    return (
        <header id="site-header">
        <nav className="navbar" id="navbar">
            <section className="navbar-dashboard" id="myPetsAddPet">
                <div className="first-bar">
                    <NavLink to="/" className="button" >Home</NavLink>
                    <NavLink className="button" to="/teams">Teams</NavLink>
                    <NavLink className="button" to="/racers">Racers</NavLink>
                    <NavLink className="button" to="/shop">Shop</NavLink>
                    <NavLink className="button" to="/about">About Us</NavLink>
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