//react fucntion that displays info

import React from "react";

export function ItemInfo({ item }) {
    return (
        <div className="item-info">
            <h1>
                {item.title} - {item.price}$
            </h1>
            <p>{item.description}</p>
            <button>Delete</button>
            <button>Edit</button>
        </div>
    );
}
