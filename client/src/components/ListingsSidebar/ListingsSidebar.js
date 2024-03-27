import React from "react";
import "./ListingsSidebar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function ListingsSidebar() {
    const navigate = useNavigate();
    const [t] = useTranslation("global");
    const [itemType, setItemType] = useState("items");
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
        queries += itemType ? `type=${itemType}&` : "items&";
        queries += condition ? `condition=${condition}&` : "";
        queries += minPrice > 0 ? `minPrice=${minPrice}&` : "";
        queries += maxPrice > 0 ? `maxPrice=${maxPrice}&` : "";
        queries = queries.substring(0, queries.length - 1);
        navigate("/?"+queries);
        toggleSidebar();
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
                    <h3 className="filter-title">{t("filter.filter")}</h3>
                    <select
                        className="item-type-select"
                        onChange={(e) => handleItemTypeChoice(e.target.value)}>
                        <option value="items" defaultValue>{t("filter.items")}</option>
                        <option value="cars">{t("filter.cars")}</option>
                    </select>
                    <select
                        name="condition"
                        className="condition-select"
                        onChange={(e) => handleConditionChoice(e.target.value)}>
                        <option value={""}>{t("filter.condition")}</option>
                        <option value="new">{t("filter.new")}</option>
                        <option value="fair">{t("filter.fair")}</option>
                        <option value="used">{t("filter.used")}</option>
                    </select>
                    <h3 className="price-title">{t("filter.price")}</h3>
                    <div className="price-filter">
                        <input
                            type="number"
                            min={0}
                            placeholder={t("filter.min")}
                            onChange={(e) =>
                                setMinPrice(e.target.value)
                            }></input>
                        <p>to</p>
                        <input
                            type="number"
                            min={minPrice || 0}
                            placeholder={t("filter.max")}
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
