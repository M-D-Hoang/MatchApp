import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import "./AppLayout.css";

/**
 * Layout component that renders a Navbar and an Outlet (current page) inside App.
 *
 * @return {JSX.Element} The rendered layout component
 */
export function AppLayout(props) {
    return (
        <div className="app-layout">
            <Navbar setUsername={props.setUsername} setPfpURL={props.setPfpURL} pfpURL={props.pfpURL}/>
            <Outlet />
        </div>
    );
}