//render a react component
import React from "react";
import { ItemInfo } from "../DetailedView/ItemInfo";
import tempImage from "../../assets/images/item-image-temp1.png";

import "./DetailedViewLayout.css";

export function DetailedView() {
    return (
        <div className={"overlay"}>
            <div className={"detailed-view"}>
                <div className={"item-image"}>
                    <img src={tempImage} />
                </div>
                <ItemInfo />
            </div>
        </div>
    );
}
