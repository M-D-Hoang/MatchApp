import React from "react";
import { useState } from "react";
import "./ListingsLayout.css";

import { ItemCardRectangle } from "../../components/ItemCard/ItemCardRectangle";
import { ItemCardSquare } from "../../components/ItemCard/ItemCardSquare";
import { DetailedView } from "../../components/DetailedView/DetailedViewLayout";

export function ListingsLayout() {
    const [isMenuOpen, setOpen] = useState(false);
    const [isDeatiledView, setDetailedView] = useState(false);

    const handleSearchChange = () => {
        // Handle search
    };
    const handleOpen = () => {
        setOpen(!isMenuOpen);
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
    const handleShowDetailedView = () => {
        setDetailedView(true);
    };
    const handleHideDetailedView = () => {
        setDetailedView(false);
    };

    if (isDeatiledView) {
        document.body.style.overflow = "hidden";
    } else{
        document.body.style.overflow = "auto";
    }
    return (
        <div className="listings-layout">
            {isDeatiledView ? (
                <div onClick={handleHideDetailedView}>
                    <DetailedView />
                </div>
            ) : null}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearchChange}
                />
                <div className="dropdown">
                    <button onClick={handleOpen}>Sort By</button>
                    {isMenuOpen ? (
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
            <div
                className="listings-display square"
                onClick={handleShowDetailedView}>
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
