import React from "react";
import "./style.css";

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
            <div className="listings-display">Listings</div>
        </div>
    );
}
