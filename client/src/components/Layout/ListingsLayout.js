import React from "react";
import { useState, useEffect } from "react";
import "./ListingsLayout.css";

//import { ItemCardRectangle } from "../../components/ItemCard/ItemCardRectangle";
import { ItemCardSquare } from "../../components/ItemCard/ItemCardSquare";
import { DetailedView } from "../../components/DetailedView/DetailedViewLayout";

export function ListingsLayout() {
    const [isMenuOpen, setOpen] = useState(false);
    const [isDeatiledView, setDetailedView] = useState(false);
    const [filter, setFilter] = useState("");

    function handleSearchChange(e) {
        setFilter(e.target.value);
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        alert(filter);
        
    }
    //Fetch data from API
    const [listingData, setListingData] = useState([]);
    const [currentItem, setCurrentItem] = useState([]);
    useEffect(() => {
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
    }, []);

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
                    <button className="sort-button" onClick={handleOpen}>Sort By</button>
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
                className="listings-display square">
                {listingJSX}
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