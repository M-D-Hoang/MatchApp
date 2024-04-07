import React, { useState } from "react";
import { ListingsSidebar } from "../../components/ListingsSidebar/ListingsSidebar";
import { ListingsLayout } from "../../components/Layout/ListingsLayout";
import "./Listings.css";
import useWindowDimensions from "../../components/useWindowWidth";


export function Listings() {

    const [open, setOpen] = useState(false);

    const toggleOpen = ()=>{
        setOpen(!open);
    }

    const { width } = useWindowDimensions();

    const mobileWidth = 680;
    const isMobile = !(width <= mobileWidth);
    const sidebarForceShowWidth = 1081;
    const sidebarForceShown = !(width <= sidebarForceShowWidth);

    return (
        <div className="listings-page">
            <ListingsSidebar isMobile={isMobile} isSidebarOpen={open} setIsSidebarOpen={setOpen}/>
            <ListingsLayout isMobile={isMobile} toggleSideBar={toggleOpen} sidebarForce={sidebarForceShown}/>
        </div>
    );
}

