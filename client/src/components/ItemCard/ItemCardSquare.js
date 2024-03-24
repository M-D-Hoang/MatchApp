import React from "react";
import { useState } from "react";
import { DetailedView } from "../DetailedView/DetailedViewLayout";
import "./ItemCardSquare.css";

export function ItemCardSquare({ item }) {
    const [isDeatiledView, setDetailedView] = useState(false);

    const handleHideDetailedView = (e) => {
        if (e.target.className === "overlay") {
            setDetailedView(false);
        }
    };

    const showHandler = (e) => {
        if (e.target.className !== "overlay") {
            setDetailedView(true);
        }
    };

    if (isDeatiledView) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }

    return (
        <div className="item-card" onClick={showHandler}>
            {isDeatiledView ? (
                <div>
                    <DetailedView item={item} onExit={handleHideDetailedView} />
                </div>
            ) : null}
            {item.imageURIs !== undefined && (
                <img
                    className="preview-image"
                    src={item.imageURIs[0]}
                    alt={item.title}></img>
            )}
            <div className="preview-text">
                <p className="title">{item.title}</p>
                <p className="price">{item.price} $</p>
            </div>
        </div>
    );
}
