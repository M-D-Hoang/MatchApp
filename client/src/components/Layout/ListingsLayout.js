import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./ListingsLayout.css";

import { ItemCardSquare } from "../../components/ItemCard/ItemCardSquare";

export function ListingsLayout() {
    const [queryParameters] = useSearchParams();
    const [isMenuOpen, setOpen] = useState(false);
    const [filter, setFilter] = useState("");
    const [sortBy, setSortBy] = useState("Date: Newest");

    function handleSearchChange(e) {
        setFilter(e.target.value);
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault();

        alert(filter);
    };
    //Fetch data from API
    const [listingData, setListingData] = useState([]);
    useEffect(() => {
        if (queryParameters.size === 0) {
            fetch("/api/listings")
                .then((resp) => {
                    return resp.json();
                })
                .then((json) => {
                    setListingData(json);
                })
                .catch((e) => {
                    console.error(e);
                    setListingData([]);
                });
        } else {
            fetch(
                "/api/listings/" +
                    queryParameters.get("type") +
                    "?" +
                    queryParameters.toString()
            )
                .then((resp) => {
                    return resp.json();
                })
                .then((json) => {
                    setListingData(json);
                })
                .catch((e) => {
                    console.error(e);
                    setListingData([]);
                });
        }
    }, [queryParameters]);

    const handleOpen = () => {
        setOpen(!isMenuOpen);
    };
    const handleSortByPriceAsc = () => {
        setOpen(false);
        setSortBy("Price: Low to High");
        // Handle sort
    };
    const handleSortByPriceDesc = () => {
        setOpen(false);
        setSortBy("Price: High to Low");
    };
    const handleSortByOldest = () => {
        setOpen(false);
        setSortBy("Date: Oldest");
    };
    const handleSortByNewest = () => {
        setOpen(false);
        setSortBy("Date: Newest");
    };

    const listingJSX = listingData.map((item) => {
        return <ItemCardSquare key={item._id} item={item}></ItemCardSquare>;
    });

    return (
        <div className="listings-layout">
            <div className="search-bar">
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        value={filter}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                    />
                </form>
                <div className="dropdown">
                    <button className="sort-button" onClick={handleOpen}>
                        Sort by:
                        <div className="sort-by">{sortBy}</div>
                    </button>
                    {isMenuOpen ? (
                        <div className="dropdown-content">
                            {sortBy !== "Date: Newest" ? (
                                <button onClick={handleSortByNewest}>
                                    Date: Newest
                                </button>
                            ) : null}
                            {sortBy !== "Date: Oldest" ? (
                                <button onClick={handleSortByOldest}>
                                    Date: Oldest
                                </button>
                            ) : null}
                            {sortBy !== "Price: Low to High" ? (
                                <button onClick={handleSortByPriceAsc}>
                                    Price: Low to High
                                </button>
                            ) : null}
                            {sortBy !== "Price: High to Low" ? (
                                <button onClick={handleSortByPriceDesc}>
                                    Price: High to Low
                                </button>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </div>
            <div className="listings-display square">{listingJSX}</div>
        </div>
    );
}
