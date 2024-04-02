import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/images/logo512.png";
import { Login } from "../Login/LoginLayout.js";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import "../ImportedComponents/toggle.css";


/**
 * Renders the navigation bar component. This includes the logo, the title, and links to pages.
 *
 * @return {JSX.Element} The rendered navigation bar.
 */
export function Navbar(props) {
    // eslint-disable-next-line no-unused-vars
    const [t, i18n] = useTranslation("global");
    const [isDark, setIsDark] = useState(false);

    const { height, width } = useWindowDimensions();
    const mobileWidth = 621; //Width the window will need to be less than to go into mobile ver.



    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDark(true);
            document.body.classList.add("dark");
        }
    }, []);

    const handleDarkMode = (isDark) => {
        setIsDark(isDark);
        if (isDark) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }
    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <nav>
          {width} - {!(width <= mobileWidth) && "nah"}
            {!(width <= mobileWidth) ?
                <nav className="navbar"><div className="logo">
                    <Link to="/">
                        <img className="logo" src={logo} alt="logo"></img>
                    </Link>
                </div><div className="title">
                        <Link to="/">
                            <h1 className="navbar-title">MatchApp</h1>
                        </Link>
                    </div><div id="language-selector">
                        <p onClick={() => handleChangeLanguage("en")}>EN</p>
                        <p>|</p>
                        <p onClick={() => handleChangeLanguage("fr")}>FR</p>
                    </div><Toggle
                        checked={isDark}
                        onChange={({ target }) => handleDarkMode(target.checked)}
                        icons={{ checked: "🌙", unchecked: "🔆" }}
                        aria-label="Dark mode toggle" /><Login setUsename={props.setUsername} pfpURL={props.pfpURL} setPfpURL={props.setPfpURL} />
                </nav>    
        : 
        <nav className="navbar"><div className="logo">
                    <Link to="/">
                        <img className="logo" src={logo} alt="logo"></img>
                    </Link>
                </div><Login setUsename={props.setUsername} pfpURL={props.pfpURL} setPfpURL={props.setPfpURL} isMobile={!(width <= mobileWidth)} />
                </nav>    
        }
        </nav>
    );
}

//Window Dimension Functions

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}