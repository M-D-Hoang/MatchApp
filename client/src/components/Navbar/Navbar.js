import React from "react";
import "./Navbar.css";
import logo from "../../assets/images/logo512.png";
import { Login } from "../Login/LoginLayout.js";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


/**
 * Renders the navigation bar component. This includes the logo, the title, and links to pages.
 *
 * @return {JSX.Element} The rendered navigation bar.
 */
export function Navbar(props) {
    // eslint-disable-next-line no-unused-vars
    const [t, i18n] = useTranslation("global");

    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">
                    <img className="logo" src={logo} alt="logo"></img>
                </Link>
            </div>
            <div className="title">
                <Link to="/">
                    <h1 className="navbar-title">MatchApp</h1>
                </Link>
            </div>
            <div id="language-selector">
              <p onClick={() => handleChangeLanguage("en")}>EN</p>
              <p>|</p>
              <p onClick={() => handleChangeLanguage("fr")}>FR</p>
              <p>|</p>
              <p onClick={() => handleChangeLanguage("ru")}>RU</p>
            </div>
            <Login setNotifications={props.setNotifications} setUsename={props.setUsername} pfpURL={props.pfpURL} setPfpURL={props.setPfpURL} />
        </nav>
    );
}
