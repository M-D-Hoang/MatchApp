import React from "react";
import { ListingsSidebar } from "../../components/ListingsSidebar/ListingsSidebar";
import { ListingsLayout } from "../../components/Layout/ListingsLayout";
import "./Listings.css";
import useWindowDimensions from "../../components/useWindowWidth";


export function Listings() {

    const { width } = useWindowDimensions();

    const mobileWidth = 680;
    const isMobile = !(width <= mobileWidth);


    return (
        <div className="listings-page">
            <ListingsSidebar isMobile={isMobile}/>
            <ListingsLayout isMobile={isMobile}/>
        </div>
    );
}

