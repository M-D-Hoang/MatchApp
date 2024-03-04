import React from "react";
import { ItemInfo } from "../../components/DetailedView/ItemInfo";
import tempImage from "../../assets/images/item-image-temp1.png";
import { useLocation } from "react-router-dom";
import "./FullView.css";


export function FullView() {
    const location = useLocation();
    const item = location.state.data;

    
    const image = item.imageURIs[0];
    if (image === undefined) {
        image = tempImage;
    }

    return (
        <div className={"full-view-page"}>
            <div className={"item-image"}>
                <button className={"item-image-button"}>L</button>
                <img src={image} />
                <button className={"item-image-button"}>R</button>
            </div>
            <ItemInfo item={item} />
        </div>
    );
}
