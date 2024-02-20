import React from "react";
import { ListingsSidebar } from "../../components/ListingsSidebar/ListingsSidebar";
import { ListingsLayout } from "../../components/Layout/ListingsLayout";
import "./Listings.css";

export function Listings() {
    return (
        <div className="listings-page">
            <ListingsSidebar />
            <ListingsLayout />
        </div>
    );
}
