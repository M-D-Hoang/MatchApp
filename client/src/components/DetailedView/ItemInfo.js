//react fucntion that displays info

import React from "react";

export function ItemInfo({item, onDeleteClicked}) {
    return <div className="item-info">
        <h1>{item.title} - {item.price}$</h1>
        <p>{item.description}</p>
        <button onClick={onDeleteClicked}>Delete</button>
        </div>;
}