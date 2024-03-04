//import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ItemForm } from "../../components/Forms/ItemForm.js";
import { CarForm } from "../../components/Forms/CarForm.js";

export function Edit() {
    const location = useLocation();
    const item = location.state.data;
    const isCar = item.make !== undefined;
    return (
        <div className="sell-page">
            <h1>Edit Your Listing</h1>
            {isCar ? <CarForm item={item} /> : <ItemForm item={item} />}
        </div>
    );
}
