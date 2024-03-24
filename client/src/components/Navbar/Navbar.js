import React from "react";
import "./Navbar.css";
import logo from "../../assets/images/logo512.png";
import { Login } from "../Login/LoginLayout.js";
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
                    <img className="logo" src={logo} alt="logo"></img>
                </Link>
            </div>
            <div className="title">
                <Link to="/">
                    <h1>MatchApp</h1>
                </Link>
            </div>
            <Login setUsename={props.setUsername} pfpURL={props.pfpURL} setPfpURL={props.setPfpURL} />
            
        </nav>
    );
}
