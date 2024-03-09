import React from "react";
import "./ListingsSidebar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ListingsSidebar() {
    const navigate = useNavigate();

    const [itemType, setItemType] = useState("");
    const [condition, setCondition] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleConditionChoice = (value) => {
        setCondition(value);
    };

    const handleItemTypeChoice = (value) => {
        setItemType(value);
    };

    const submitQueries = (e) => {
        e.preventDefault();
        var queries = "";
        queries += itemType ? `type=${itemType}&` : "";
        queries += condition ? `condition=${condition}&` : "";
        queries += minPrice > 0 ? `minPrice=${minPrice}&` : "";
        queries += maxPrice > 0 ? `maxPrice=${maxPrice}&` : "";
        queries = queries.substring(0, queries.length - 1);
        navigate("/?"+queries);
    };

    const toggleSidebar = () => {
        if (window.innerWidth <= 1081) {
            setIsSidebarOpen(!isSidebarOpen);
        }
    };

    const sidebarClassname = "sidebar " + isSidebarOpen;
    return (
        <div className={sidebarClassname}>
            <form onSubmit={(e) => submitQueries(e)} className="filters-form">
                <div className="form-input">
                    <h3 className="filter-title">Filters</h3>
                    <select
                        className="item-type-select"
                        onChange={(e) => handleItemTypeChoice(e.target.value)}>
                        <option>Type</option>
                        <option value="items">Items</option>
                        <option value="cars">Cars</option>
                    </select>
                    <select
                        name="condition"
                        className="condition-select"
                        onChange={(e) => handleConditionChoice(e.target.value)}>
                        <option value={""}>Condition</option>
                        <option value="new">New</option>
                        <option value="fair">Fair</option>
                        <option value="used">Used</option>
                    </select>
                    <h3 className="price-title">Price</h3>
                    <div className="price-filter">
                        <input
                            type="number"
                            min={0}
                            placeholder="Min"
                            onChange={(e) =>
                                setMinPrice(e.target.value)
                            }></input>
                        <p>to</p>
                        <input
                            type="number"
                            min={minPrice || 0}
                            placeholder="Max"
                            onChange={(e) =>
                                setMaxPrice(e.target.value)
                            }></input>
                    </div>
                </div>
                <div className="bottom-container">
                    <div
                        onClick={toggleSidebar}
                        className={"toggle-sidebar " + isSidebarOpen}></div>
                    <input type="submit" className="submit-filters"></input>
                </div>
            </form>
        </div>
    );
}
