import React from "react";
import "./ItemCardSquare.css";

export function ItemCardSquare({title}) {
    return (
        <div className="item-card">
            <h1>{title}</h1>
            <img src="https://i.kym-cdn.com/entries/icons/facebook/000/028/315/cover.jpg"></img>
        </div>
    );
}
