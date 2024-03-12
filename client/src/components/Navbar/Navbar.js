import React from "react";
import "./Navbar.css";
import { Login } from "../Login/LoginLayout.js";
import logo from "../../assets/images/logo-temp.png";
import { Link } from "react-router-dom";


/**
 * Renders the navigation bar component. This includes the logo, the title, and links to pages.
 *
 * @return {JSX.Element} The rendered navigation bar.
 */
export function Navbar(props) {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="logo"></img>
                </Link>
            </div>
            <div className="title">
                <Link to="/">
                    <h1>Fake Market Place</h1>
                </Link>
            </div>
            <Login setUsename={props.setUsername} />
            <div className="link-container">
                <div className="link">
                    <Link to="/sell">Sell</Link>
                </div>
                <div className="link pfp-container">
                    <Link className="pfp-container-link" to="/my-page">
                        <img
                            className="navbar-pfp"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTTiQ8Yl6XjZK9qjqoqztkUDOXXerRr7Kp0z38NwfdYQ&s"
                            alt="my-account"></img>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
