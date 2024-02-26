import React from "react";
import "./ItemCardSquare.css";

export function ItemCardSquare({ title }) {
    return (
        <div className="item-card">
            <img className="preview-image" src="https://i.kym-cdn.com/entries/icons/facebook/000/028/315/cover.jpg"></img>
            <div className="preview-text">
                <p className="title">{title}</p>
                <p className="price">£0.00</p>
            </div>
            
        </div>
    );
}
