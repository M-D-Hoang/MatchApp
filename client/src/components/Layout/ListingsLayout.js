import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./ListingsLayout.css";
import ReactLoading from 'react-loading';
import { ItemCardSquare } from "../../components/ItemCard/ItemCardSquare";
import { useTranslation } from "react-i18next";

export function ListingsLayout() {
    const [t] = useTranslation("global");
    const navigate = useNavigate();

    const [queryParameters] = useSearchParams();
    const [isMenuOpen, setOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [sortBy, setSortBy] = useState(t("filter.newest"));
    const [loadingDone, setLoadingDone] = useState(false)
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
            setLoadingDone(false);
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

                })
                .finally(() => { setLoadingDone(true) });

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
        setSortBy(t("filter.lowPrice"));
        sortByHandler("price", "asc");
    };
    const handleSortByPriceDesc = () => {
        setOpen(false);
        setSortBy("filter.highPrice");
        sortByHandler("price", "desc");
    };
    const handleSortByOldest = () => {
        setOpen(false);
        setSortBy(t("filter.oldest"));
        sortByHandler("date", "asc");
    };
    const handleSortByNewest = () => {
        setOpen(false);
        setSortBy(t("filter.newest"));
        sortByHandler("date", "desc");
    };

    const listingJSX = listingData.map((item) => {
        return <ItemCardSquare key={item._id} item={item}></ItemCardSquare>;
    });

    return (
        <div className="listings-layout">

            {!loadingDone ? <ReactLoading className="loading-bar" type={"spin"} color={"#58cc77"} height={400} width={400} /> :
                <><div className="search-bar">
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            value={keyword}
                            onChange={handleSearchChange}
                            placeholder={t("filter.search")} />
                    </form>
                    <div className="dropdown">
                        <button className="sort-button" onClick={handleOpen}>
                            {t("filter.sortBy")}
                            <div className="sort-by">{sortBy}</div>
                        </button>
                        {isMenuOpen ? (
                            <div className="dropdown-content">
                                {sortBy !== "Date: Newest" ? (
                                    <button onClick={handleSortByNewest}>
                                        {t("filter.newest")}
                                    </button>
                                ) : null}
                                {sortBy !== "Date: Oldest" ? (
                                    <button onClick={handleSortByOldest}>
                                        {t("filter.oldest")}
                                    </button>
                                ) : null}
                                {sortBy !== "Price: Low to High" ? (
                                    <button onClick={handleSortByPriceAsc}>
                                        {t("filter.lowPrice")}
                                    </button>
                                ) : null}
                                {sortBy !== "Price: High to Low" ? (
                                    <button onClick={handleSortByPriceDesc}>
                                        {t("filter.highPrice")}
                                    </button>
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                </div>
                    {listingJSX.length === 0 && loadingDone ? (
                        <div className="no-results">{t("filter.none")}</div>
                    ) : null}
                    <div className="listings-display square">{listingJSX}</div>
                </>
            }



        </div>
    );
}
