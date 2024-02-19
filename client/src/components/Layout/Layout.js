import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

/**
 * Layout component that renders a Navbar and an Outlet (current page) inside App.
 *
 * @return {JSX.Element} The rendered layout component
 */
export function Layout() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}