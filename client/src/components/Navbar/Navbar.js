import React from "react";
import "./style.css";
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
                <h1>Fake Market Place</h1>
            </div>
            <div className="links"> Links to other pages</div>
        </nav>
    );
}
