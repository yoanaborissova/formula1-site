import React from 'react';
import { NavLink, Switch } from 'react-router-dom';

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
                                    <NavLink to="#" onClick={props.logout}> Logout</NavLink>
                                </li>
                            </ul>                               
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <ul>
                                <li>
                                    <NavLink to="/register"> Register</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/login"> Login</NavLink>
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