import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./ListingsLayout.css";
import ReactLoading from "react-loading";
import { ItemCardSquare } from "../../components/ItemCard/ItemCardSquare";
import { useTranslation } from "react-i18next";
import { DropdownSort } from "../DropdownSort/DropdownSort";

export function ListingsLayout({isMobile}) {
  const [t] = useTranslation("global");
  const navigate = useNavigate();

  const [queryParameters] = useSearchParams();

  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState(t("filter.newest"));
  const [loadingDone, setLoadingDone] = useState(false);
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
        : "items";
      url += queryParameters.toString();
            console.log(url);
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
        .finally(() => {
          setLoadingDone(true);
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

  const listingJSX = listingData.map((item) => {
    return <ItemCardSquare key={item._id} item={item}></ItemCardSquare>;
  });

  return (
    <div className="listings-layout">
      {!loadingDone ? (
        <ReactLoading
          className="loading-bar"
          type={"spin"}
          color={"#58cc77"}
          height={400}
          width={400}
        />
      ) : (
        <>
          <div className="search-bar">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={keyword}
                onChange={handleSearchChange}
                placeholder={t("filter.search")}
              />
              
            </form>
            {isMobile && <DropdownSort t={t} sortBy={sortBy} setSortBy={setSortBy} sortByHandler={sortByHandler}/>}
          </div>
          {!isMobile && <div><DropdownSort t={t} sortBy={sortBy} setSortBy={setSortBy} sortByHandler={sortByHandler}/></div>}
          {listingJSX.length === 0 && loadingDone ? (
            <div className="no-results">{t("filter.none")}</div>
          ) : null}
          <div className="listings-display square">{listingJSX}</div>
        </>
      )}
    </div>
  );
}


