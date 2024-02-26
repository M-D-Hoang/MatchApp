import React from "react";
import "./ItemCardSquare.css";

export function ItemCardSquare({item, showHandler}) {
    return (
        <div className="item-card" onClick={showHandler}>
            <h1>{item.title}</h1>
            <img src={item.imageURIs[0]}></img>
        </div>
    );
}
