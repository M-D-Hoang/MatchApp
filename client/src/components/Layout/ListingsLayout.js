import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./ListingsLayout.css";

import { ItemCardSquare } from "../../components/ItemCard/ItemCardSquare";

export function ListingsLayout() {
    const navigate = useNavigate();

    const [queryParameters] = useSearchParams();
    const [isMenuOpen, setOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [sortBy, setSortBy] = useState("Date: Newest");

    const handleSearchChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        let params = queryParameters;
        if (params.has("keyword")) {
            params.delete("keyword");
        }
        if (params.length > 0) {
            params += "&";
        }
        if (keyword.length > 0) {
           params += `&keyword=${keyword}`; 
        }
        let url = queryParameters.get("type") === null ? "?type=items" : "?";
        url += params;
        navigate(url);
    };
    //Fetch data from API
    const [listingData, setListingData] = useState([]);
    useEffect(() => {
        try {
            let url = "/api/listings/";
            url += queryParameters.get("type")
                ? `${queryParameters.get("type")}?`
                : "";
            url += queryParameters.toString();
            fetch(url)
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
        } catch (error) {
            console.log(error);
        }
    }, [queryParameters]);

    //Sorting
    const sortByHandler = (sortField, sortOrder) => {
        let params = queryParameters;
        //remove existing sort params
        if (params.has("sortField")) {
            params.delete("sortField");
        }
        if (params.has("sortOrder")) {
            params.delete("sortOrder");
        }
        if (params.length > 0) {
            params += "&";
        }
        //add new sort params and update url
        params += `&sortField=${sortField}&sortOrder=${sortOrder}`;
        let url = queryParameters.get("type") === null ? "?type=items" : "?";
        url += params;
        navigate(url);
    };
    const handleOpen = () => {
        setOpen(!isMenuOpen);
    };
    const handleSortByPriceAsc = () => {
        setOpen(false);
        setSortBy("Price: Low to High");
        sortByHandler("price", "asc");
    };
    const handleSortByPriceDesc = () => {
        setOpen(false);
        setSortBy("Price: High to Low");
        sortByHandler("price", "desc");
    };
    const handleSortByOldest = () => {
        setOpen(false);
        setSortBy("Date: Oldest");
        sortByHandler("date", "asc");
    };
    const handleSortByNewest = () => {
        setOpen(false);
        setSortBy("Date: Newest");
        sortByHandler("date", "desc");
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
                        value={keyword}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                    />
                </form>
                <div className="dropdown">
                    <button className="sort-button" onClick={handleOpen}>
                        Sort by
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
            {listingJSX.length === 0 ? (
                <div className="no-results">No results found</div>
            ) : null}
            <div className="listings-display square">{listingJSX}</div>
        </div>
    );
}
