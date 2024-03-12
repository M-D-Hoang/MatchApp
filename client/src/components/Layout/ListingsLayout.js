import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./ListingsLayout.css";

//import { ItemCardRectangle } from "../../components/ItemCard/ItemCardRectangle";
import { ItemCardSquare } from "../../components/ItemCard/ItemCardSquare";
import { DetailedView } from "../../components/DetailedView/DetailedViewLayout";

export function ListingsLayout() {
    const [queryParameters] = useSearchParams();
    const [isMenuOpen, setOpen] = useState(false);
    const [isDeatiledView, setDetailedView] = useState(false);
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
    const [currentItem, setCurrentItem] = useState([]);
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
    function handleShowDetailedView(item){
        setCurrentItem(item);
        setDetailedView(true);
    };
    const handleHideDetailedView = (e) => {
        
        if(e.target.className === "overlay"){
            setDetailedView(false);
        }
    };

    //generate JSX based on listing data
    const listingJSX = listingData.map((item) => {
        return (
            <ItemCardSquare key={item._id} item={item} showHandler={()=>{handleShowDetailedView(item)}}></ItemCardSquare>
        );
    });

    if (isDeatiledView) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }

    return (
        <div className="listings-layout">
            {isDeatiledView ? (
                <div>
                    <DetailedView item={currentItem} onExit={handleHideDetailedView}/>
                </div>
            ) : null}
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