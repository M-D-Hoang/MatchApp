import React from "react";
import "./ListingsSidebar.css";
import { useState } from "react";

export function ListingsSidebar() {
    const [condition, setCondition] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleConditionChoice = (value) => {
        setCondition(value);
    };

    const submitQueries = () => {
        // TODO: Submit queries
    };
    return (
        <div className="sidebar">
            <form onSubmit={submitQueries}>
                <select
                    className="condition-select"
                    onChange={(e) => handleConditionChoice(e.target.value)}>
                    <option>Condition</option>
                    <option value="new">New</option>
                    <option value="fair">Fair</option>
                    <option value="used">Used</option>
                </select>
                <h3>Price</h3>
                <div className="price-filter">
                    <input
                        type="number"
                        name="price"
                        placeholder="Min"
                        onChange={(e) => setMinPrice(e.target.value)}></input>
                        <p>to</p>
                    <input
                        type="number"
                        name="price"
                        placeholder="Max"
                        onChange={(e) => setMaxPrice(e.target.value)}></input>
                </div>
                <input type="submit"></input>
            </form>
        </div>
    );
}
