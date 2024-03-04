//react fucntion that displays info
import { useNavigate } from "react-router-dom";
import React from "react";

export function ItemInfo({ item, onDeleteClicked }) {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate("/edit", { state: { data: item } });
    };

    const handleFullView = () => {
        navigate("/fullview", { state: { data: item } });
    };
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
                {item.extraField && item.extraField !== "none" && (
                    <p className="detail">
                        <b>Extra:</b> {item.extraField}
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
            </div>
            <h3 className="description-title">Description</h3>
            <p className="description">{item.description}</p>

            <button>Delete</button>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleFullView}>Full View</button>
        </div>
    );
}
