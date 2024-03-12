import React, { useState, useEffect } from "react";
import { ItemInfo } from "../../components/DetailedView/ItemInfo";
import tempImage from "../../assets/images/item-image-temp1.png";
import { useNavigate, useSearchParams } from "react-router-dom";

import "./FullView.css";

export function FullView() {
    const navigate = useNavigate();
    const [queryParameters] = useSearchParams();

    const [item, setItem] = useState();

    const itemId = queryParameters.get("itemId");

    useEffect(() => {
        fetch("/api/listings/item/" + itemId)
            .then((resp) => resp.json())
            .then((json) => setItem(json))
            .catch((e) => {
                console.error(e);
                setItem();
            });
    }, [itemId]);

    const image = item ? item.imageURIs[0] : tempImage;

    const handleEdit = () => {
        navigate("/edit", { state: { data: item } });
    };

    if (item) {
        return (
            <div className={"full-view-page"}>
                <div className={"item-image"}>
                    <button className={"item-image-button right"}></button>
                    <img src={image} alt="item" />
                    <button className={"item-image-button left"}></button>
                </div>
                <div className="item-info-container">
                    <ItemInfo item={item} />
                    <div className="action-container">
                        <button>Delete</button>
                        <button onClick={handleEdit}>Edit</button>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}
