import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import "./style.css";

/**
 * Layout component that renders a Navbar and an Outlet (current page) inside App.
 *
 * @return {JSX.Element} The rendered layout component
 */
export function Layout() {
    return (
        <div className="layout">
            <Navbar />
            <Outlet />
        </div>
    );
}