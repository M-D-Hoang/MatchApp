//react fucntion that displays info
import {  useNavigate } from "react-router-dom";
import React from "react";


export function ItemInfo({item, onDeleteClicked}) {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate('/edit', {state: {data: item}});
    };

    const handleFullView = () => {
        navigate('/fullview', {state: {data: item}});
    }
    return (
        <div className="item-info">
            <h1>
                {item.title} - {item.price}$
            </h1>
            <p>{item.description}</p>Í
            <button>Delete</button>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleFullView}>Full View</button>
        </div>
    );
}

