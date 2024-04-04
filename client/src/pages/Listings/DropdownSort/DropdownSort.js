import { useState } from "react";

export function DropdownSort({ t, sortBy, setSortBy, sortByHandler }) {
  const [isMenuOpen, setOpen] = useState(false);

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

  return (
    <div className="dropdown">
      <button className="sort-button" onClick={handleOpen}>
        {t("filter.sortBy")}
        <div className="sort-by">{sortBy}</div>
      </button>
      {isMenuOpen ? (
        <div className="dropdown-content">
          {sortBy !== "Date: Newest" ? (
            <button onClick={handleSortByNewest}>{t("filter.newest")}</button>
          ) : null}
          {sortBy !== "Date: Oldest" ? (
            <button onClick={handleSortByOldest}>{t("filter.oldest")}</button>
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
  );
}