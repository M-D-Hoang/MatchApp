import React from "react";
import "./Navbar.css";
import logo from "../../assets/images/logo-temp.png";
import { Link } from "react-router-dom";

/**
 * Renders the navigation bar component. This includes the logo, the title, and links to pages.
 *
 * @return {JSX.Element} The rendered navigation bar.
 */
export function Navbar() {
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
            <div className="link-container">
                <div className="link">
                    <Link to="/sell">Sell</Link>
                </div>
                <div className="link pfp-container">
                    <Link className="pfp-container-link" to="/my-page">
                        <img
                            className="navbar-pfp"
                            src="https://cdn.discordapp.com/emojis/383621124854120449.webp?size=1024&quality=lossless&name=bolus"
                            alt="my-account"></img>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
