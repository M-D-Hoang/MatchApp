import React from "react";

export function ItemInfo({ item, onDeleteClicked }) {
    return (
        <div className="item-info">
            <h1 className="title">{item.title}</h1>
            <h2 className="price">{item.price}$</h2>
            <div className="detail-container">
                {item.make && (
                    <p className="detail">
                        <b>Make:</b> {item.make}
                    </p>
                )}
                {item.model && (
                    <p className="detail">
                        <b>Model:</b> {item.model}
                    </p>
                )}
                {item.year && (
                    <p className="detail">
                        <b>Mileage:</b> {item.year}
                    </p>
                )}
                {item.mileage && (
                    <p className="detail">
                        <b>Mileage:</b> {item.mileage} km
                    </p>
                )}
                {item.condition && (
                    <p className="detail">
                        <b>Condition:</b> {item.condition}
                    </p>
                )}
                {item.extraField && item.extraField !== "none" && (
                    <p className="detail">
                        <b>Extra:</b> {item.extraField}
                    </p>
                )}
            </div>
            <h3 className="description-title">Description</h3>
            <p className="description">{item.description}</p>
        </div>
    );
}
