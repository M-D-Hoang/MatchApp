import React from "react";
import { ListingsSidebar } from "../../components/ListingsSidebar/ListingsSidebar";
import { ListingsLayout } from "../../components/ListingsLayout/ListingsLayout";
import "./style.css";

export function Listings() {
    return (
        <div className="listings-display">
            <ListingsSidebar />
            <ListingsLayout />
        </div>
    );
}
