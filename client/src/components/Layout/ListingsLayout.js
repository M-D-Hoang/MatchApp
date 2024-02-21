import React from "react";
import "./ListingsLayout.css";

import { ItemCardRectangle } from "../../components/ItemCard/ItemCardRectangle";
import { ItemCardSquare } from "../../components/ItemCard/ItemCardSquare";
import { DetailedView } from "../../components/DetailedView/DetailedViewLayout";


export function ListingsLayout() {
    const [open, setOpen] = React.useState(false);
    const handleSearchChange = () => {
        // Handle search
    };
    const handleOpen = () => {
        setOpen(!open);
    };
    const handleSortByPrice = () => {
        setOpen(false);
        // Handle sort
    };
    const handleSortByTime = () => {
        setOpen(false);
        // Handle sort
    };
    const handleSortByLocation = () => {
        setOpen(false);
        // Handle sort
    };

    return (
        <div className="listings-layout">
            <DetailedView />
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearchChange}
                />
                <div className="dropdown">
                    <button onClick={handleOpen}>Sort By</button>
                    {open ? (
                        <div className="dropdown-content">
                            <button onClick={handleSortByPrice}>Price</button>
                            <button onClick={handleSortByTime}>Time</button>
                            <button onClick={handleSortByLocation}>
                                Location
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
            <div className="listings-display square">
                <ItemCardSquare />
                <ItemCardSquare />
                <ItemCardSquare />
                <ItemCardSquare />
                <ItemCardSquare />
                <ItemCardSquare />
                <ItemCardSquare />
                <ItemCardSquare />
                <ItemCardSquare />
                <ItemCardSquare />
                <ItemCardSquare />
                <ItemCardSquare />
                <ItemCardSquare />
                <ItemCardSquare />
                <ItemCardSquare />
            </div>
            {/* <div className="listings-display rectangle">
                <ItemCardRectangle />
                <ItemCardRectangle />
                <ItemCardRectangle />
                <ItemCardRectangle />
                <ItemCardRectangle />
                <ItemCardRectangle />
            </div> */}
        </div>
    );
}
