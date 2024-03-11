import React from "react";
import "./ItemCardSquare.css";

export function ItemCardSquare({ item, showHandler }) {
    return (
        <div className="item-card" onClick={showHandler}>
            <img className="preview-image" src={item.imageURIs[0]} alt={item.title}></img>
            <div className="preview-text">
                <p className="title">{item.title}</p>
                <p className="price">{item.price} $</p>
            </div>
        </div>
    );
}