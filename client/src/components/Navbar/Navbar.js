import React from "react";
import "./Navbar.css";
import { Login } from "../Login/Login.js";
import logo from "../../assets/images/logo-temp.png";
import { Link } from "react-router-dom";

/**
 * Renders the navigation bar component. This includes the logo, the title, and links to pages.
 *
 * @return {JSX.Element} The rendered navigation bar.
 */

// TODO: props contains setUsername() set username when you need login
// TODO: setup Login page
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
                    <h1>MatchApp</h1>
                </Link>
            </div>
            <Login setUsename={props.setUsername} />
            <div className="link-container">
                <div className="link">
                    <Link to="/sell">Sell</Link>
                </div>
                <div className="link">
                    <Link to="/your-listings">Your Listings</Link>
                </div>
            </div>
        </nav>
    );
}
